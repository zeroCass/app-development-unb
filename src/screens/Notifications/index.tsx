import { useFocusEffect } from '@react-navigation/native'
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
import { useCallback, useContext, useRef, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native'
import { NotificationsContext } from '../../context/Notifications'
import { db } from '../../services/firebase'

type notificationsDataType = {
	id: string
	from: string
	to: string
	title: string
	body: string
	data: any
}

const Notifications = () => {
	const { expoPushToken, notification, sendPushNotification } = useContext(NotificationsContext)
	const itemsPerPage = 7
	const [loading, setLoading] = useState(false)
	const [loadingMoreContent, setLoadMoreContent] = useState(false)
	const [notificationsData, setNotificationsData] = useState<notificationsDataType[]>([])
	const lastDocRef = useRef<QueryDocumentSnapshot>()

	useFocusEffect(
		useCallback(() => {
			fetchInitialData()
			return () => setNotificationsData([])
		}, [])
	)

	const queryDataInDB = async (queryMounted: Query): Promise<notificationsDataType[]> => {
		const querySnapshot = await getDocs(queryMounted)
		// last visible document
		lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1]
		const dataArray: any[] = []
		// build the data to be insert into pets array
		querySnapshot.forEach((doc) => {
			const data = doc.data()
			dataArray.push({ id: doc.id, ...data })
			// console.log(doc.id)
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
				where('to', '==', expoPushToken)
			)

			const dataArray = await queryDataInDB(queryMounted)
			setNotificationsData(dataArray)
			console.log(notificationsData.length, 'notificationsData size')
			console.log('notifcationsData: ', notificationsData)
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
				startAfter(lastDocRef.current),
				limit(itemsPerPage),
				where('to', '==', expoPushToken)
			)
			const dataArray = await queryDataInDB(queryMounted)
			const newNotificationsArray = [...notificationsData, ...dataArray]
			setNotificationsData(newNotificationsArray)
			console.log(dataArray.length, 'newPets size')
			console.log('notifcationsData: ', notificationsData)
		} catch (error) {
			console.log(error)
		} finally {
			setLoadMoreContent(false)
		}
	}

	if (loading) {
		return <ActivityIndicator size='large' />
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
			<Text>Your expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text>Title: {notification && notification.request.content.title} </Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
			</View>
			<FlatList
				data={notificationsData}
				renderItem={({ item }: { item: notificationsDataType }) => (
					<View style={{ backgroundColor: '#88c9bf', margin: 12 }}>
						<Text>Title: {item.title}</Text>
						<Text>From: {item.from}</Text>
						<Text>Body: {item.body}</Text>
					</View>
				)}
				keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.1}
				onEndReached={() => fetchMoreData()}
			/>
			<Button
				title='Press to Send Notification'
				onPress={() => {
					sendPushNotification({ to: expoPushToken, from: expoPushToken })
				}}
			/>
		</View>
	)
}

export default Notifications
