import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { 
    EXPO_PUBLIC_API_KEY,
    EXPO_PUBLIC_AUTH_DOMAIN,
    EXPO_PUBLIC_PROJECT_ID,
    EXPO_PUBLIC_STORAGE_BUCKET,
    EXPO_PUBLIC_MESSAGING_SENDER_ID,
    EXPO_PUBLIC_APP_ID,
    EXPO_PUBLIC_MEASUREMENT_ID
} from "@env"

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
const auth = getAuth(app)

export {
    app,
    auth,
    createUserWithEmailAndPassword
}
