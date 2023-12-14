import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { NotificationsDataType } from '..'
import MainButton from '../../../components/MainButton'
import { PetData } from '../../../components/PetList'
import { AuthContext, TUser } from '../../../context/Auth'
import { db, storage } from '../../../services/firebase'
import { defaultUserImage, fetchedImageUrl } from '../../../services/images'
import UserRequester from './UserRequester'
import { getDownloadURL, ref } from 'firebase/storage'

type TNotificationCard = {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
	notification: NotificationsDataType
	pet: PetData
}

type TFetchData = {
	setData: (data: any) => void
	document: string
	documentID: string
}

const NotificationModal = ({ isOpen, setIsOpen, notification, pet }: TNotificationCard) => {
	const { user } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [senderUser, setSenderUser] = useState<TUser>({} as TUser)
	// const navigation = useNavigation<RootDrawerParamList>()

	useEffect(() => {
		const subscribe = async () => {
			setLoading(true)
			// fetch sender user
			await fetchData({
				document: 'users',
				documentID: notification.senderID,
				setData: (data: any) => setSenderUser({ user_uid: data.id, ...data }),
			})

			// set notification as viewd if not viewd yet
			if (!notification.viewed) {
				console.log(notification.id)
				await updateDoc(doc(db, 'notifications', notification.id), {
					viewed: true,
				})
			}
			setLoading(false)
		}

		subscribe()
	}, [notification.senderID, notification.petID])

	const fetchData = async ({ document, documentID, setData }: TFetchData) => {
		try {
			const docRef = doc(db, document, documentID)
			const data = await getDoc(docRef)
			setData({ id: data.id, ...data.data() })
		} catch (error) {
			console.warn(error)
		}
	}

	const isMyPet = (): boolean => {
		// check if the pet is owned by the user
		if (pet.owner !== user.user_uid) {
			Alert.alert(
				'Erro',
				`Você não pode realizar essa operação pois o pet não é seu.`,
				[
					{
						text: 'Ok',
					},
				],
				{
					cancelable: true,
				}
			)
			return false
		}
		return true
	}

	const handleAgrement = async () => {
		setLoading(true)
		if (isMyPet()) {
			const docRef = doc(db, 'pet', pet.id)
			await updateDoc(docRef, {
				owner: senderUser.user_uid,
			})
			// update noitification
			await updateDoc(doc(db, 'notifications', notification.id), {
				agrement: true,
			})
			Alert.alert(
				'Adoção Aceita!',
				`Você aceitou a adoção do pet. Agora ele é de outra pessoa.`,
				[
					{
						text: 'Ok',
					},
				],
				{
					cancelable: true,
				}
			)
		}
		setLoading(false)
		setIsOpen(false)
	}

	const handleDisagrament = async () => {
		setLoading(true)
		if (isMyPet()) {
			const docRef = doc(db, 'notifications', notification.id)
			await updateDoc(docRef, {
				disagrement: true,
			})
			Alert.alert(
				'Adoção Recusada',
				`Você recusou a adoção do pet. Ele ainda continua sendo seu.`,
				[
					{
						text: 'Ok',
					},
				],
				{
					cancelable: true,
				}
			)
		}
		setLoading(false)
		setIsOpen(false)
	}

	const handleOpenChat = async () => {
		setLoading(true)
		if (!isMyPet()) {
			const docRef = doc(db, 'notifications', notification.id)
			await updateDoc(docRef, {
				disagrement: true,
			})
			Alert.alert(
				'Erro!',
				`Este pet não é seu, portanto você não pode abrir um chat com o usuário.`,
				[
					{
						text: 'Ok',
					},
				],
				{
					cancelable: true,
				}
			)
		} else {
			const avatar = await getDownloadURL(ref(storage, `user/${user.user_uid}/profilePicture.png`))
			const message = {
				_id: Math.round(Math.random() * 1000000),
				createdAt: new Date(),
				sent: true,
				received: true,
				text: "Quero adotar o " + pet.name + "!",
				user: {
					_id: 1,
					avatar: avatar,
					name: user.username,
				}
			}
			const newChat = {
				lastMessage: message,
				participants: [user.user_uid, pet.owner],
			}
	
			const chatId = await addDoc(collection(db, 'chat'), newChat)
	
			const chatHist = {
				chat: chatId.id,
				messages: [message],
			}
	
			await addDoc(collection(db, 'chatHistory'), chatHist)
		}


		setLoading(false)
		setIsOpen(false)
	}

	return (
		<Modal
			animationType='fade'
			transparent={true}
			visible={isOpen}
			onRequestClose={() => setIsOpen(false)}
		>
			<Pressable
				style={styles.centeredView}
				onPress={(event: any) => event.target === event.currentTarget && setIsOpen(false)}
			>
				{loading ? (
					<ActivityIndicator />
				) : (
					<View style={styles.modalView}>
						<Text style={styles.title}>{notification.message.title}</Text>
						<Text style={styles.textCenter}>{notification.message.body}</Text>
						<Text style={styles.textCenter}>
							Data:{' '}
							{`${notification.date.toLocaleDateString(
								'pt-BR'
							)} às ${notification.date.toLocaleTimeString('pt-BR')}`}
						</Text>
						<UserRequester senderUser={senderUser} />
						<View style={styles.btnContainer}>
							<MainButton
								text='Aprovar'
								styleButton={{ flex: 1 }}
								onPress={handleAgrement}
								disabled={notification.agrement || notification.disagrement}
							/>
							<MainButton
								text='Desaprovar'
								styleButton={{ flex: 1 }}
								onPress={handleDisagrament}
								styleText={{ fontSize: 10 }}
								disabled={notification.agrement || notification.disagrement}
							/>
							<MainButton
								text='Chat'
								styleButton={{ flex: 1 }}
								onPress={handleOpenChat}
								disabled={notification.agrement || notification.disagrement}
							/>
						</View>
					</View>
				)}
			</Pressable>
		</Modal>
	)
}

const UserPhoto = ({ userID }: { userID: string }) => {
	const [url, setUrl] = useState<string>('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchedImageUrl({
			storageUrl: `user/${userID}/profilePicture.png`,
			setLoading: (state: boolean) => setLoading(state),
			setUrl: (url: string) => setUrl(url),
		})
	}, [])

	return (
		<View style={styles.userPhotoContainer}>
			{loading && <ActivityIndicator />}
			{url === '' ? (
				<Image style={styles.image} source={defaultUserImage} />
			) : (
				<Image style={styles.image} source={{ uri: url }} />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
	},
	modalView: {
		padding: 10,
		width: '80%',
		backgroundColor: '#fff',
		maxHeight: '70%',
	},
	title: {
		fontWeight: '900',
		fontSize: 18,
		padding: 5,
		alignSelf: 'center',
	},
	textCenter: {
		alignSelf: 'center',
	},
	image: {
		flex: 1,
		width: 150,
		height: 150,
		borderRadius: 75,
		resizeMode: 'cover',
	},
	userPhotoContainer: {
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 150,
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 5,
		marginVertical: 10,
	},
})

export default NotificationModal
