import * as Notifications from 'expo-notifications'
import { useEffect, useRef } from 'react'
import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import { useNotifications } from './src/hooks/useNotifications'
import Routes from './src/routes'

export default function App() {
	const notificationListener = useRef({} as Notifications.Subscription)
	const responseListener = useRef({} as Notifications.Subscription)
	const { handleNotificationResponse, registerForPushNotificationsAsync } = useNotifications()

	useEffect(() => {
		registerForPushNotificationsAsync()
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}),
		})

		// notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
		// 	handleNotificationReceived(notification)
		// })

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			handleNotificationResponse(response)
		})

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current)
			Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [])

	return (
		<AuthProvider>
			{/* <NotificationsProvider>
				<Routes />
			</NotificationsProvider> */}
			<Routes />
		</AuthProvider>
	)
}
