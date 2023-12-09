import { AuthContext } from '../../../context/Auth'
import { useEffect, useState, useContext } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { fetchedImageUrl } from '../../../services/images'
import {
    IMessage
} from 'react-native-gifted-chat'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../services/firebase'

type Props = {
	participants: string[] | undefined
	messages: IMessage[]
}

export type TUser = {
	full_name?: string
	username?: string
	age?: number
	email?: string
	phone?: string
	city?: string
	state?: string
	address?: string
	user_uid?: string
	expoToken?: string
}

const ChatCard = ({ participants, messages }: Props) => {
    const {user} = useContext(AuthContext)
    let uuidToFetch = participants?.filter((participant) => participant !== user.user_uid)[0]
	const defaultImage = require('../../../assets/images/default-pf.png')
	const [loading, setLoading] = useState(false)
	const [userData, setUserData] = useState<TUser>({})
	const [url, setUrl] = useState<string>('')
	
	if (uuidToFetch) {
		getDoc(doc(db, 'users', uuidToFetch)).then((fetched_data) => {
			setUserData({...fetched_data.data()})
		})
	}

	useEffect(() => {
		if (!uuidToFetch) return setLoading(true)
        fetchedImageUrl({
			storageUrl: `user/${uuidToFetch}/profilePicture.png`,
			setLoading: (state: boolean) => setLoading(state),
			setUrl: (url: string) => setUrl(url),
		})
	}, [uuidToFetch])

	const lastMessage = messages[0]

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator />
			</View>
		)
	}

	return (
		<View style={styles.card}>
			<View>
				{url === '' ? (
					<Image style={styles.image} source={defaultImage} />
				) : (
					<Image style={styles.image} source={{ uri: url} } />
				)}
			</View>
			<View style={styles.infoSection}>
				<Text>{userData.full_name}</Text>
                <View style={styles.lastMessageSection}>
                    <Text style={styles.lastMessageText}>
						{ lastMessage?.user.name !== user.username ? lastMessage?.user.name : "Você"}: {lastMessage?.text}
					</Text>
                </View>
            </View>
		</View>
	)
}

const styles = StyleSheet.create({
	loadingContainer: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 75,
		height: 75,
		borderRadius: 100,
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: '#000',
		elevation: 5,
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		margin: 10,
	},
	infoSection: {
		marginLeft: 20,
	},
	lastMessageSection: {
		marginTop: 10,
	},
	lastMessageText: {
		color: 'grey',
		opacity: 0.8,
	}
})

export default ChatCard
