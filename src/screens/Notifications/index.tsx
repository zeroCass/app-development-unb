import { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { NotificationsContext } from '../../context/Notifications'

const Notifications = () => {
	const { expoPushToken, notification, sendPushNotification } = useContext(NotificationsContext)
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
			<Text>Your expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text>Title: {notification && notification.request.content.title} </Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
			</View>
			<Button
				title='Press to Send Notification'
				onPress={() => {
					sendPushNotification(expoPushToken)
				}}
			/>
		</View>
	)
}

export default Notifications
