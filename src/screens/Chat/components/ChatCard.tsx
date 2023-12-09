import { AuthContext } from '../../../context/Auth'
import { useEffect, useState, useContext } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { fetchedImageUrl } from '../../../services/images'
import {
    IMessage
} from 'react-native-gifted-chat'

type Props = {
	messages: IMessage[]
	otherUserUID: string
	otherUserUsername: string
}

const ChatCard = ({ messages, otherUserUID, otherUserUsername }: Props) => {
    const {user} = useContext(AuthContext)
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
				<Text>{otherUserUsername}</Text>
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
