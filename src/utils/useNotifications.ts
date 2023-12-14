import * as Notifications from 'expo-notifications'
import { doc, updateDoc } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import 'react-native-gesture-handler'
import { navigate } from '../routes/navigationRef'
import { db } from '../services/firebase'

import Constants from 'expo-constants'
import * as Device from 'expo-device'
import { Alert, Platform } from 'react-native'
import 'react-native-gesture-handler'
// import notifications from '../services/notifications'

export type NotificationSendMessageType = {
	to: string
	from: string
}

export type NotificationsMessageType = {
	id: string
	from: string
	to: string
	title: string
	body: string
	data: any
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

async function registerForPushNotificationsAsync() {
	let token = {} as Notifications.ExpoPushToken

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
			Alert.alert('Notifications', 'Failed to get push token for push notification!', [
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			])
			return
		}

		// Gambiarra
		if (Constants.expoConfig?.extra) {
			token = await Notifications.getExpoPushTokenAsync({
				projectId: Constants.expoConfig.extra.eas.projectId,
			})
		} else {
			Alert.alert('Notifications', 'Error on ExpoConfig', [
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			])
		}
	} else {
		Alert.alert('Notifications', 'Must use physical device for Push Notifications', [
			{ text: 'OK', onPress: () => console.log('OK Pressed') },
		])
	}

	return token.data
}

const useNotifications = (user_signed: boolean, user_uid: string) => {
	// const { user, updateExpoToken } = useContext(AuthContext)
	// const { expoPushToken } = notifications()
	const [expoPushToken, setExpoPushToken] = useState<any>('')
	const [notificationPending, setNotificationPending] = useState(false)
	const [notification, setNotification] = useState(null as Notifications.Notification | null)
	const notificationListener = useRef({} as Notifications.Subscription)
	const responseListener = useRef({} as Notifications.Subscription)

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification)
			console.log(notification)
		})

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current)
		}
	}, [])

	useEffect(() => {
		console.log('valor de singed em notificaiotn 2: ', user_signed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log('response - signed: ', response, user_signed)
			if (user_signed) {
				console.log('usuario logado')
				navigate('Notifications', {}, 'useNavigation')
			}

			if (!user_signed) {
				console.log('usuario DESlogado')
				setNotificationPending(true)
			}
		})
		return () => {
			Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [user_signed])

	useEffect(() => {
		if (user_uid && expoPushToken) {
			updateExpoToken(user_uid, expoPushToken)
		}
	}, [user_uid, expoPushToken])

	const updateExpoToken = async (user_uid: string, expoPushToken: string) => {
		try {
			await updateDoc(doc(db, 'users', user_uid), {
				expoToken: expoPushToken,
			})
		} catch (error) {
			console.warn(error)
		}
	}

	return {
		notification,
		notificationPending,
		setNotificationPending,
	}
}

export default useNotifications
