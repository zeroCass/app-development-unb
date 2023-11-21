import { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { AuthContext } from '../../context/Auth'
import { useNotifications } from '../../hooks/useNotifications'

const Notifications = () => {
	const { expoPushToken } = useContext(AuthContext)
	const { sendPushNotification } = useNotifications()

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
			<Text>Your expo push token: {expoPushToken}</Text>
			{/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text>Title: {notification && notification.request.content.title} </Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
			</View> */}
			<Button
				title='Press to Send Notification'
				onPress={() => {
					sendPushNotification()
				}}
			/>
		</View>
	)
}

export default Notifications
