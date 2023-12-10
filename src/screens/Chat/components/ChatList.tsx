import { AuthContext } from '../../../context/Auth'
import { useContext, useState, useRef, useCallback } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { ChatData } from '../interfaces'
import {
	Query,
	QueryDocumentSnapshot,
	collection,
	getDocs,
	limit,
	query,
	startAfter,
	where,
} from 'firebase/firestore'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { db } from '../../../services/firebase'
import { ActivityIndicator, FlatList, TouchableOpacity, View, StyleSheet } from 'react-native'
import { ChatParamList } from 'routes/types'
import ChatCard from '../components/ChatCard'
import { doc, getDoc } from 'firebase/firestore'

const ChatList = () => {
	const chatsPerPage = 7
	const { user } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [loadingMoreContent, setLoadMoreContent] = useState(false)
	const [chatsData, setChatsData] = useState<ChatData[]>([])
	const lastDocRef = useRef<QueryDocumentSnapshot>()
	const navigation = useNavigation<StackNavigationProp<ChatParamList>>()

	useFocusEffect(
		useCallback(() => {
			fetchInitialData()
			return () => setChatsData([])
		}, [])
	)

	const fetchInitialData = async () => {
		if (loading) return
		try {
			setLoading(true)
			let queryMounted: Query

			queryMounted = query(
				collection(db, 'chat'),
				limit(chatsPerPage),
				where("participants", "array-contains", user.user_uid)
			)

			const dataArray = await queryDataInDB(queryMounted)
			setChatsData(dataArray)
		} catch (error) {
			console.warn(error)
		} finally {
			setLoading(false)
		}
	}

	const queryDataInDB = async (queryMounted: Query): Promise<ChatData[]> => {
		const querySnapshot = await getDocs(queryMounted)
		// last visible document
		lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1]

		const dataArray: any[] = []
		for (const chatdoc of querySnapshot.docs) {
			const data = chatdoc.data()
			let otherUser = data.participants.filter((participant: string) => participant !== user.user_uid)[0]
			const otherUserData = await getDoc(doc(db, 'users', otherUser))
			dataArray.push({ id: chatdoc.id, ...data, otherUserUID: otherUserData.id, otherUserUsername: otherUserData.data()?.username })
		}

		return dataArray
	}

	const fetchMoreData = async () => {
		if (loadingMoreContent) return
		if (!lastDocRef.current) return

		try {
			setLoadMoreContent(true)
			let queryMounted: Query

			queryMounted = query(
				collection(db, 'chat'),
				startAfter(lastDocRef.current),
				limit(chatsPerPage),
				where("participants", "array-contains", user.user_uid)
			)

			const dataArray = await queryDataInDB(queryMounted)
			const newChatsArray = [...chatsData, ...dataArray]
			setChatsData(newChatsArray)
		} catch (error) {
			console.log(error)
		} finally {
			setLoadMoreContent(false)
		}
	}

	if (loading) {
		return <ActivityIndicator style={styles.container} size='large' />
	}

	return (
		<View style={{ padding: 12, backgroundColor: '#fafafa', flex: 1 }}>
			<FlatList
				data={chatsData}
				renderItem={({ item }: { item: ChatData }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('ActualChat', { chat: item })
						}
					>
						<ChatCard
							message={item.lastMessage}
							otherUserUID={item.otherUserUID}
							otherUserUsername={item.otherUserUsername}
						/>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.1}
				onEndReached={() => fetchMoreData()}
				ListFooterComponent={loadingMoreContent ? <FooterComponent /> : null}
			/>
		</View>
	)
}

const FooterComponent = () => {
	return (
		<View>
			<ActivityIndicator size='large' color='red' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
})

export default ChatList