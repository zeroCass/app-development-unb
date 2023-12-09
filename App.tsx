import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import { useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import NotificationsProvider from './src/context/Notifications'
import Routes from './src/routes'
// import { useLinkTo } from '@react-navigation/native'

const prefix = Linking.createURL('/')

export default function App() {
	const [data, setData] = useState<any>()
	const responseListener = useRef({} as Notifications.Subscription)

	const linking = {
		prefixes: [prefix],
		config: {
			screens: {
				Notifications: 'notifications',
				UserRegister: 'register',
			},
		},
	}

	const handleDeepLink = (event: any) => {
		const data = Linking.parse(event.url)
		setData(data)
		console.log('inital url: ', data)
	}

	useEffect(() => {
		const navigateToInitialURL = async () => {
			const initialURL = await Linking.getInitialURL()
			if (initialURL) {
				setData(Linking.parse(initialURL))
				console.log('inital url: ', initialURL, data)
				await Linking.openURL(initialURL)
			}
		}

		Linking.addEventListener('url', handleDeepLink)
		if (!data) {
			navigateToInitialURL()
		}
	}, [])

	useEffect(() => {
		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log('cliquei: ', response)
		})

		return () => Notifications.removeNotificationSubscription(responseListener.current)
	}, [])

	return (
		<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
			<NotificationsProvider>
				<AuthProvider>
					<Routes />
				</AuthProvider>
			</NotificationsProvider>
		</NavigationContainer>
	)
}
