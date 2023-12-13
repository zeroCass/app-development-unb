import { AuthContext } from '../../../context/Auth'
import { useEffect, useState, useContext } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { fetchedImageUrl } from '../../../services/images'
import {
	IMessage
} from 'react-native-gifted-chat'
import { Timestamp } from 'firebase/firestore'

type Props = {
	message: any
	otherUserUID: string
	otherUserUsername: string
}

const ChatCard = ({ message, otherUserUID, otherUserUsername }: Props) => {
	const { user } = useContext(AuthContext)
	const defaultImage = require('../../../assets/images/default-pf.png')
	const [loading, setLoading] = useState(false)
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		fetchedImageUrl({
			storageUrl: `user/${otherUserUID}/profilePicture.png`,
			setLoading: (state: boolean) => setLoading(state),
			setUrl: (url: string) => setUrl(url),
		})
	}, [])

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator />
			</View>
		)
	}

	try{
		const date = new Timestamp(
			message.createdAt.seconds, message.createdAt.nanoseconds
		).toDate()
	
		return (
			<View style={styles.card}>
				<View>
					{url === '' ? (
						<Image style={styles.image} source={defaultImage} />
					) : (
						<Image style={styles.image} source={{ uri: url }} />
					)}
				</View>
				<View style={styles.infoSection}>
					<Text>{otherUserUsername}</Text>
					<View style={styles.lastMessageSection}>
						<Text style={styles.lastMessageText}>
							{message.user.name !== user.username ? message.user.name : "Você"}: {message.text}
						</Text>
						<Text style={styles.lastMessageText}>
							{date.getHours()}:{date.getMinutes()}
						</Text>
					</View>
				</View>
			</View>
		)
	} catch (err) {
		return (
			<View style={styles.card}>
				<View>
					{url === '' ? (
						<Image style={styles.image} source={defaultImage} />
					) : (
						<Image style={styles.image} source={{ uri: url }} />
					)}
				</View>
				<View style={styles.infoSection}>
					<Text>{otherUserUsername}</Text>
					<View style={styles.lastMessageSection}>
						<Text style={styles.lastMessageText}>
							Carregando
						</Text>
					</View>
				</View>
			</View>
		)
	}

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
		flexShrink: 1,
	},
	lastMessageSection: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		flexShrink: 1,
		width: '100%',
	},
	lastMessageText: {
		color: 'grey',
		opacity: 0.8,
	}
})

export default ChatCard
