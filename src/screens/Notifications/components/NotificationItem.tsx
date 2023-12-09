import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { NotificationsDataType } from '..'
import { PetData } from '../../../components/PetList'
import { db } from '../../../services/firebase'
import { defaultPetImage, fetchedImageUrl } from '../../../services/images'
import NotificationModal from './NotificationModal'

const NotificationItem = ({
	notification,
	onModalClose,
}: {
	notification: NotificationsDataType
	onModalClose: () => void
}) => {
	// const defaultImage = require('../../../assets/images/default-pf.png')
	const [modalIsOpen, setModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [pet, setPet] = useState<PetData>({} as PetData)
	const [url, setUrl] = useState<string>('')

	const status = notification.disagrement
		? 'Não aceito'
		: notification.agrement
		? 'Aceito'
		: notification.viewed
		? 'Visualizado'
		: 'Não visualizado'

	useEffect(() => {
		fetchPet()
	}, [])

	useEffect(() => {
		fetchedImageUrl({
			storageUrl: `pet/${pet.id}/image_0.png`,
			setLoading: (state: boolean) => setLoading(state),
			setUrl: (url: string) => setUrl(url),
		})
	}, [pet])

	const fetchPet = async () => {
		try {
			setLoading(true)
			const docRef = doc(db, 'pet', notification.petID)
			const data = await getDoc(docRef)
			const petData = { id: data.id, ...data.data() } as PetData
			setPet(petData)
		} catch (error) {
			console.warn(error)
		} finally {
			setLoading(false)
		}
	}

	const handleModalOpen = (value: boolean) => {
		setModalOpen(value)
		// modal is closed then realod notificaion page
		if (!value) onModalClose()
	}

	return (
		<>
			<NotificationModal
				notification={notification}
				isOpen={modalIsOpen}
				setIsOpen={handleModalOpen}
				pet={pet}
			/>
			{loading ? (
				<View style={styles.itemContainer}>
					<ActivityIndicator />
				</View>
			) : (
				<Pressable onPress={() => handleModalOpen(true)}>
					<View style={styles.itemContainer}>
						<View style={styles.flexCenter}>
							<View style={styles.itemImage}>
								{url === '' ? (
									<Image style={styles.image} source={defaultPetImage} />
								) : (
									<Image style={styles.image} source={{ uri: url }} />
								)}
							</View>
						</View>
						<View style={styles.itemTextContainer}>
							<Text style={styles.title}>Adoção</Text>
							<View style={styles.info}>
								<Text>{pet?.name?.toUpperCase()}</Text>
								<Text>Status: {status}</Text>
							</View>
							<Text style={{ fontStyle: 'italic' }}>{`${notification.date.toLocaleDateString(
								'pt-BR'
							)}`}</Text>
						</View>
						<View style={styles.icon}>
							{status === 'Aceito' && <FontAwesome name='check' size={24} color='#5ae84a' />}
							{status === 'Não aceito' && <FontAwesome name='remove' size={24} color='#eb4034' />}
							{status === 'Não visualizado' && (
								<Ionicons name='notifications-sharp' size={24} color='black' />
							)}
							{status === 'Visualizado' && <Ionicons name='eye-sharp' size={24} color='black' />}
						</View>
					</View>
				</Pressable>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	itemContainer: {
		padding: 6,
		marginTop: 20,
		width: 350,
		height: 120,
		flexDirection: 'row',
		backgroundColor: '#fee29b',
		borderRadius: 10,
	},
	itemImage: {
		width: 100,
		height: 100,
	},
	image: {
		flex: 1,
		width: '100%',
		resizeMode: 'cover',
	},
	flexCenter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemTextContainer: {
		flex: 2,
		alignItems: 'center',
	},
	icon: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
	title: {
		fontWeight: '900',
		fontSize: 18,
		padding: 5,
	},
	info: {
		width: '100%',
		justifyContent: 'flex-start',
		margin: 10,
	},
})

export default NotificationItem
