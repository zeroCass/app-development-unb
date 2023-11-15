import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import Routes from './src/routes'
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string) {
	const message = {
		to: expoPushToken,
		sound: 'default',
		title: 'Original Title',
		body: 'And here is the body!',
		data: { someData: 'goes here' },
	};
  
	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
	  	},
	  	body: JSON.stringify(message),
	});
}

async function registerForPushNotificationsAsync() {
	let token = {} as Notifications.ExpoPushToken;
  
	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
	  	});
	}
  
	if (Device.isDevice) {
	  	const { status: existingStatus } = await Notifications.getPermissionsAsync();
	  	let finalStatus = existingStatus;
	  	if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
	  	}
	  	if (finalStatus !== 'granted') {
			Alert.alert('Notifications', 'Failed to get push token for push notification!', [
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			]);
			return;
	  	}

		// Gambiarra
		if (Constants.expoConfig?.extra){
			token = await Notifications.getExpoPushTokenAsync({
				projectId: Constants.expoConfig.extra.eas.projectId,
			});
		} else {
			Alert.alert('Notifications', 'Error on ExpoConfig', [
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			]);
		}
	  	console.log(token);
	} else {
		Alert.alert('Notifications', 'Must use physical device for Push Notifications', [
			{text: 'OK', onPress: () => console.log('OK Pressed')},
		]);
	}
  
	return token.data;
}

export default function App() {

	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState({} as Notifications.Notification);
	const notificationListener = useRef({} as Notifications.Subscription);
	const responseListener = useRef({} as Notifications.Subscription);

	useEffect(() => {

		registerForPushNotificationsAsync().then(token => setExpoPushToken(token || ''));

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);


	return (
		<AuthProvider>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
				<Text>Your expo push token: {expoPushToken}</Text>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Text>Title: {notification && notification.request.content.title} </Text>
					<Text>Body: {notification && notification.request.content.body}</Text>
					<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
				</View>
				<Button
					title="Press to Send Notification"
					onPress={async () => {
						await sendPushNotification(expoPushToken);
					}}
				/>
    		</View>
			<Routes />
		</AuthProvider>
	)
}
