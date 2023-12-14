import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { createContext, useContext, useEffect, useState } from 'react'
import { IRegisterUser } from 'screens/UserRegister/interfaces'
import { auth, db, storage } from '../services/firebase'
import { AppContext } from './Global'

export type TUser = {
	full_name?: string
	username?: string
	age?: number
	email?: string
	phone?: string
	city?: string
	state?: string
	address?: string
	user_uid: string
	signed: boolean
	expoToken?: string
}

type AuthContextType = {
	user: TUser
	signin: (email: string, password: string) => void
	signout: () => void
	signup: (userData: IRegisterUser) => void
	loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
	user: { signed: false, user_uid: '' },
	signin: () => {},
	signout: () => {},
	signup: () => {},
	loading: true,
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
	// const { expoPushToken } = useContext(NotificationsContext)
	const { dispatch } = useContext(AppContext)
	const [user, setUser] = useState<TUser>({ signed: false, user_uid: '' })
	const [loading, setLoading] = useState(false)
	// const { notificationPending, setNotificationPending } = useNotifications(
	// 	user.signed,
	// 	user.user_uid
	// )

	useEffect(() => {
		const subscribe = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				setLoading(true)
				await getUserFromDB(userAuth.uid)
				setLoading(false)
			} else {
				signout()
			}
		})
		return subscribe
	}, [])

	const getUserFromDB = async (user_uid: string) => {
		try {
			await getDoc(doc(db, 'users', user_uid)).then((fetched_data) => {
				const user_data = fetched_data.data()
				setUser({ ...user_data, user_uid: user_uid, signed: true })
			})
			// handleNotificationPending()
			// await updateDoc(doc(db, 'users', user_uid), {
			// 	expoToken: expoPushToken,
			// })
			dispatch({ type: 'SET_USER_SIGNED_IN', payload: true })
		} catch (error) {
			console.warn(error)
		}
	}

	const signin = async (email: string, password: string) => {
		setLoading(true)
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			await getUserFromDB(userCredential.user.uid)
		} catch (error) {
			console.warn(error)
		}
		setLoading(false)
	}

	const signout = () => {
		setLoading(true)
		if (user.user_uid) {
			// updateDoc(doc(db, 'users', user.user_uid), {
			// 	expoToken: '',
			// })
		}
		auth.signOut().catch((error) => console.warn(error.message))
		setUser({ signed: false, user_uid: '' })
		dispatch({ type: 'SET_USER_SIGNED_IN', payload: false })
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
				// expoToken: expoPushToken,
				expoToken: '',
			}

			const authResult = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			)
			setDoc(doc(db, 'users', authResult.user.uid), newUser)
			await uploadImageToFirebase(userData, authResult.user.uid)
			await getUserFromDB(authResult.user.uid)
		} catch (error) {
			console.warn(error)
		}
		setLoading(false)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				signin,
				signout,
				signup,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
