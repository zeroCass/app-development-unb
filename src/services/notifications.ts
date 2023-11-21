import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Alert, Platform } from 'react-native'

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
export async function sendPushNotification(expoPushToken: string) {
	const message = {
		to: expoPushToken,
		sound: 'default',
		title: 'Original Title',
		body: 'And here is the body!',
		data: { someData: 'goes here' },
	}

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	})
}

export async function registerForPushNotificationsAsync() {
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
		console.log(token)
	} else {
		Alert.alert('Notifications', 'Must use physical device for Push Notifications', [
			{ text: 'OK', onPress: () => console.log('OK Pressed') },
		])
	}

	return token.data
}
