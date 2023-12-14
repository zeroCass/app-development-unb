import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import React, { Dispatch, ReactNode, createContext, useEffect, useReducer, useRef } from 'react'
import { Alert, Platform } from 'react-native'
import 'react-native-gesture-handler'
import { openLinkURL } from '../routes/navigationRef'

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

// Define the initial state
interface AppState {
	expoNotificationToken: string | null
	notification: any
	notificationResponse: any
	userSignedIn: boolean
	notificationPending: { pending: boolean; response: any }
	// Add other global state variables here
}

// Define the action types
type Action =
	| { type: 'SET_NOTIFICATION_TOKEN'; payload: string }
	| { type: 'SET_NOTIFICATION_DATA'; payload: any }
	| { type: 'SET_NOTIFICATION_RESPONSE'; payload: any }
	| { type: 'SET_USER_SIGNED_IN'; payload: boolean }
	| { type: 'NOTIFICATION_PEDING'; payload: any }

// Define the context type
export interface AppContextType {
	state: AppState
	dispatch: Dispatch<Action>
}

// Create the initial state
const initialState: AppState = {
	expoNotificationToken: null,
	notification: {},
	notificationResponse: {},
	notificationPending: { pending: false, response: {} },
	userSignedIn: false,
	// Initialize other global state variables here
}

// Create the context
export const AppContext = createContext<AppContextType>({ state: initialState, dispatch: () => {} })

// Create the reducer function
const appReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case 'SET_NOTIFICATION_TOKEN':
			return { ...state, expoNotificationToken: action.payload }
		// Handle other action types here
		case 'SET_NOTIFICATION_DATA':
			return { ...state, notification: action.payload }
		case 'NOTIFICATION_PEDING':
			console.log('notification pending: ', action.payload)
			return { ...state, notificationPending: action.payload }
		case 'SET_USER_SIGNED_IN':
			console.log('Usuario logado: ', action.payload)
			return { ...state, userSignedIn: action.payload }
		default:
			return state
	}
}

// Create the context provider
interface AppProviderProps {
	children: ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState)

	const notificationListener = useRef<any>()
	const responseListener = useRef<any>()

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			dispatch({ type: 'SET_NOTIFICATION_TOKEN', payload: token || '' })
		)

		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			dispatch({ type: 'SET_NOTIFICATION_DATA', payload: notification })
		})

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			dispatch({ type: 'SET_NOTIFICATION_RESPONSE', payload: response })
			// Check if the user is signed in
			if (state.userSignedIn) {
				// If the user is signed in, navigate to the Notification screen
				console.log('Notificação clicada, usuario logado, entao navegndo para notification screen')
				dispatch({ type: 'NOTIFICATION_PEDING', payload: { pending: true, response: response } })
				openLinkURL('notifications')
			} else {
				// If the user is not signed in, set a flag in the state to navigate after signing in
				console.log('Notificação clicada, usario DESLOGADO')
				dispatch({ type: 'NOTIFICATION_PEDING', payload: { pending: true, response: response } })
			}

			console.log(response)
		})

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current)
			Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [dispatch, state.userSignedIn])

	useEffect(() => {
		console.log(
			'usEffect para mudar estado de pednding e userSinged: ',
			state.notificationPending.pending,
			state.userSignedIn
		)
		if (state.notificationPending.pending && state.userSignedIn) {
			console.log('Notificação pendente e usuario logado')
			dispatch({
				type: 'NOTIFICATION_PEDING',
				payload: { pending: false, response: state.notificationPending.response },
			})
			openLinkURL('notifications')
		}
	}, [dispatch, state.notificationPending, state.userSignedIn])

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{/* <Text>{state.expoNotificationToken}</Text>
			<Text>Pending: {state.notificationPending.pending ? 'True' : 'False'}</Text>
			<Text>User: {state.userSignedIn ? 'True' : 'False'}</Text> */}
			{children}
		</AppContext.Provider>
	)
}

// Create a custom hook for using the context
const useAppContext = () => {
	const context = React.useContext(AppContext)
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider')
	}
	return context
}

export { AppProvider, useAppContext }
