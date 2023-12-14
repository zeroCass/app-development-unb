import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect, useRef, useState } from 'react'

import { Platform } from 'react-native'
import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import Routes from './src/routes'

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
		<NavigationContainer>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</NavigationContainer>
	)
}
