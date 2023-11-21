import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { createContext, useState } from 'react'
import { IRegisterUser } from 'screens/UserRegister/interfaces'
import { useNotifications } from '../hooks/useNotifications'
import { auth, db, storage } from '../services/firebase'

type User = {
	full_name?: string
	username?: string
	age?: number
	email?: string
	phone?: string
	city?: string
	state?: string
	address?: string
	user_uid?: string
	signed: boolean
}

type AuthContextType = {
	user: User
	signin: (email: string, password: string) => void
	signout: () => void
	signup: (userData: IRegisterUser) => void
	loading: boolean
	expoPushToken: string
}

export const AuthContext = createContext<AuthContextType>({
	user: { signed: false },
	signin: () => {},
	signout: () => {},
	signup: () => {},
	loading: true,
	expoPushToken: '',
})

async function uploadImageToFirebase(userData: IRegisterUser, userUid: string) {
	const img = await fetch(userData.imageUri)
	const blob = await img.blob()
	const userRef = ref(storage, `user/${userUid}/profilePicture.png`)
	try {
		await uploadBytes(userRef, blob)
	} catch (error) {
		console.warn(error)
	}
}

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<User>({ signed: false })
	const [loading, setLoading] = useState(false)
	const [expoPushToken, setExpoPushToken] = useState('')
	const { registerForPushNotificationsAsync } = useNotifications()

	const setNotificationsListener = async () => {
		const token = await registerForPushNotificationsAsync()
		if (token) {
			setExpoPushToken(token.data)
			console.log('expoToken: ', expoPushToken)
		}
	}

	const signin = async (email: string, password: string) => {
		setLoading(true)
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			await getDoc(doc(db, 'users', userCredential.user.uid)).then((fetched_data) => {
				const user_data = fetched_data.data()
				setUser({ ...user_data, user_uid: userCredential.user.uid, signed: true })
			})
			setNotificationsListener()
		} catch (error) {
			console.warn(error)
		}
		setLoading(false)
	}

	const signout = () => {
		setLoading(true)
		auth.signOut().catch((error) => console.warn(error.message))
		setUser({ signed: false })
		setLoading(false)
	}

	const signup = async (userData: IRegisterUser) => {
		setLoading(true)
		try {
			const newUser = {
				full_name: userData.fullName,
				username: userData.username,
				email: userData.email,
				age: userData.age,
				phone: userData.phone,
				state: userData.uf,
				city: userData.city,
				address: userData.street,
			}

			const authResult = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			)
			setDoc(doc(db, 'users', authResult.user.uid), newUser)
			setUser({ ...newUser, user_uid: authResult.user.uid, signed: true })
			await uploadImageToFirebase(userData, authResult.user.uid)
		} catch (error) {
			console.warn(error)
		}
		setLoading(false)
	}

	return (
		<AuthContext.Provider value={{ user, signin, signout, signup, loading, expoPushToken }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
