import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { createContext, useContext, useState } from 'react'
import { IRegisterUser } from 'screens/UserRegister/interfaces'
import { auth, db, storage } from '../services/firebase'
import { NotificationsContext } from './Notifications'

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
	const { expoPushToken } = useContext(NotificationsContext)
	const [user, setUser] = useState<TUser>({ signed: false, user_uid: '' })
	const [loading, setLoading] = useState(false)

	const signin = async (email: string, password: string) => {
		setLoading(true)
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			await getDoc(doc(db, 'users', userCredential.user.uid)).then((fetched_data) => {
				const user_data = fetched_data.data()
				setUser({ ...user_data, user_uid: userCredential.user.uid, signed: true })
			})
			await updateDoc(doc(db, 'users', userCredential.user.uid), {
				expoToken: expoPushToken,
			})
		} catch (error) {
			console.warn(error)
		}
		setLoading(false)
	}

	const signout = () => {
		setLoading(true)
		if (user.user_uid) {
			updateDoc(doc(db, 'users', user.user_uid), {
				expoToken: '',
			})
		}
		auth.signOut().catch((error) => console.warn(error.message))
		setUser({ signed: false, user_uid: '' })
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
				expoToken: expoPushToken,
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
