import {
	EXPO_PUBLIC_API_KEY,
	EXPO_PUBLIC_APP_ID,
	EXPO_PUBLIC_AUTH_DOMAIN,
	EXPO_PUBLIC_MEASUREMENT_ID,
	EXPO_PUBLIC_MESSAGING_SENDER_ID,
	EXPO_PUBLIC_PROJECT_ID,
	EXPO_PUBLIC_STORAGE_BUCKET,
} from '@env'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: EXPO_PUBLIC_API_KEY,
	authDomain: EXPO_PUBLIC_AUTH_DOMAIN,
	projectId: EXPO_PUBLIC_PROJECT_ID,
	storageBucket: EXPO_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: EXPO_PUBLIC_MESSAGING_SENDER_ID,
	appId: EXPO_PUBLIC_APP_ID,
	measurementId: EXPO_PUBLIC_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage()

export { auth, db, storage }
