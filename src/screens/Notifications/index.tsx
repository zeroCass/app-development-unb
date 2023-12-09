import { useFocusEffect } from '@react-navigation/native'
import {
	Query,
	QueryDocumentSnapshot,
	Timestamp,
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from 'firebase/firestore'
import { useCallback, useContext, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { AuthContext } from '../../context/Auth'
import { db } from '../../services/firebase'
import NotificationItem from './components/NotificationItem'

export type NotificationsDataType = {
	id: string
	message: {
		from: string
		to: string
		title: string
		body: string
		data: any
	}
	petID: string
	senderID: string
	recieverID: string
	viewed: boolean
	agrement: boolean
	disagrement: boolean
	date: Date
}

const Notifications = () => {
	const { user } = useContext(AuthContext)
	const itemsPerPage = 7
	const [loading, setLoading] = useState(false)
	const [loadingMoreContent, setLoadMoreContent] = useState(false)
	const [notificationsData, setNotificationsData] = useState<NotificationsDataType[]>([])
	const lastDocRef = useRef<QueryDocumentSnapshot>()

	useFocusEffect(
		useCallback(() => {
			fetchInitialData()
			return () => setNotificationsData([])
		}, [])
	)

	const queryDataInDB = async (queryMounted: Query): Promise<NotificationsDataType[]> => {
		const querySnapshot = await getDocs(queryMounted)
		// last visible document
		lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1]
		const dataArray: any[] = []
		// build the data to be insert into pets array
		querySnapshot.forEach((doc) => {
			const data = doc.data()
			const date = new Timestamp(data.date.seconds, data.date.nanoseconds).toDate()
			dataArray.push({ id: doc.id, ...data, date })
			// console.warn('data: ', date.toLocaleDateString('pt-BR'), date.toLocaleTimeString('pt-BR'))
		})

		return dataArray
	}

	const fetchInitialData = async () => {
		if (loading) return
		try {
			setLoading(true)
			const queryMounted: Query = query(
				collection(db, 'notifications'),
				limit(itemsPerPage),
				where('recieverID', '==', user.user_uid),
				orderBy('date', 'desc')
			)

			const dataArray = await queryDataInDB(queryMounted)
			setNotificationsData(dataArray)
		} catch (error) {
			console.warn(error)
		} finally {
			setLoading(false)
		}
	}

	const fetchMoreData = async () => {
		if (loadingMoreContent) return
		if (!lastDocRef.current) return

		try {
			setLoadMoreContent(true)
			const queryMounted: Query = query(
				collection(db, 'notifications'),

				limit(itemsPerPage),
				where('recieverID', '==', user.user_uid),
				orderBy('date', 'desc'),
				startAfter(lastDocRef.current)
			)
			const dataArray = await queryDataInDB(queryMounted)
			const newNotificationsArray = [...notificationsData, ...dataArray]
			setNotificationsData(newNotificationsArray)
		} catch (error) {
			console.log(error)
		} finally {
			setLoadMoreContent(false)
		}
	}

	const refreshData = () => {
		setLoading(false)
		setLoadMoreContent(false)
		setNotificationsData([])
		lastDocRef.current = undefined
		fetchInitialData()
	}

	if (loading) {
		return <ActivityIndicator size='large' />
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={notificationsData}
				renderItem={({ item }) => (
					<NotificationItem onModalClose={refreshData} notification={item} />
				)}
				keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.1}
				onEndReached={() => fetchMoreData()}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
		backgroundColor: '#fafafa',
		flex: 1,
		alignItems: 'center',
	},
})

export default Notifications
