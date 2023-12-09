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
	messages: IMessage[] | undefined
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
    let user_data: TUser | undefined
    let uuidToFetch = participants?.filter((participant) => participant !== user.user_uid)[0]
	const defaultImage = require('../../../assets/images/default-pf.png')
	const [loading, setLoading] = useState(false)
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		if (!uuidToFetch) return setLoading(true)
		getDoc(doc(db, 'users', uuidToFetch)).then((fetched_data) => {
            user_data = {...fetched_data.data()}
            console.log("DADOS DO GETDOC NO CHATCARD", fetched_data.data())
        })
        fetchedImageUrl({
			storageUrl: `user/${uuidToFetch}/profilePicture.png`,
			setLoading: (state: boolean) => setLoading(state),
			setUrl: (url: string) => setUrl(url),
		})
	}, [uuidToFetch, user_data])

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={[styles.header]}>
				<Text style={styles.title}>{user_data?.full_name}</Text>
			</View>
			<View style={styles.imgContainer}>
				{url === '' ? (
					<Image style={styles.image} source={defaultImage} />
				) : (
					<Image style={styles.image} source={{ uri: url }} />
				)}
			</View>
            <View style={styles.footer}>
                <View style={styles.petInfo}>
                    <Text style={styles.text}>{messages?.slice(-1)[0]?.text}</Text>
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
	container: {
		backgroundColor: '#fff',
		height: 344,
		width: '100%',
		marginBottom: 16,
		borderRadius: 10,
		overflow: 'hidden',
		shadowColor: '#000000',
		shadowOpacity: 5,
		shadowRadius: 10,
		elevation: 3,
	},
	header: {
		height: '10%',
		paddingLeft: 16,
		justifyContent: 'center',
		width: '100%',
		backgroundColor: '#fee29b',
		// borderTopRightRadius: 10,
		// borderTopLeftRadius: 10,
	},
	imgContainer: {
		height: '70%',
		width: '100%',
		overflow: 'hidden',
	},
	image: {
		flex: 1,
		width: '100%',
		resizeMode: 'cover',
	},
	footer: {
		height: '20%',
		width: '100%',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#434343',
	},
	text: {
		fontSize: 12,
		color: '#434343',
	},
	petInfo: {
		padding: 5,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	location: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default ChatCard
