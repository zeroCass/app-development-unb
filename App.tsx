import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as ExpoLinking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import * as TaskManager from 'expo-task-manager'
import { useEffect, useRef, useState } from 'react'
import { Linking } from 'react-native'

import { Platform } from 'react-native'
import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import Routes from './src/routes'

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK'

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
	console.log('Received a notification in the background: ', data, error, executionInfo)
	// Do something with the notification data
})

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK)

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "You've got mail! 📬",
			body: 'Here is the notification body',
			data: { data: 'goes here' },
		},
		trigger: { seconds: 2 },
	})
}

async function registerForPushNotificationsAsync() {
	let token

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		})
	}

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync()
		let finalStatus = existingStatus
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync()
			finalStatus = status
		}
		if (finalStatus !== 'granted') {
			console.warn('Failed to get push token for push notification!')
			return
		}
		// Learn more about projectId:
		// https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
		token = await Notifications.getExpoPushTokenAsync({
			projectId: Constants.expoConfig.extra.eas.projectId,
		})
		console.log('token: ', token.data)
	} else {
		console.warn('Must use physical device for Push Notifications')
	}

	return token.data
}

const prefix = ExpoLinking.createURL('/')

export default function App() {
	const [expoPushToken, setExpoPushToken] = useState<any>('')
	const [notification, setNotification] = useState<any>(false)
	const notificationListener = useRef<any>()
	const responseListener = useRef<any>()

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			console.log('notification', notification)
			setNotification(notification)
		})

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log('cliquei', response)
		})

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current)
			Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [])

	return (
		<NavigationContainer
			linking={{
				prefixes: [prefix],
				config: {
					screens: {
						Notifications: 'notification',
					},
				},
				async getInitialURL() {
					const url = await Linking.getInitialURL()
					if (url != null) {
						return url
					}

					const response = await Notifications.getLastNotificationResponseAsync()
					return response?.notification.request.content.data.url
				},
				subscribe(listener) {
					const onReceiveURL = ({ url }: { url: string }) => listener(url)
					const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL)

					const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
						const url = response.notification.request.content.data.url
						console.log('subscription response: ', response.notification.request.content.data.url)
						// Any custom logic to see whether the URL needs to be handled
						//...

						// Let React Navigation handle the URL
						listener(url)
					})
					return () => {
						// Clean up the event listeners
						eventListenerSubscription.remove()
						subscription.remove()
					}
				},
			}}
		>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</NavigationContainer>
	)
}
