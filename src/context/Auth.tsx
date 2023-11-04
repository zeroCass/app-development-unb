import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { createContext, useEffect, useState } from 'react'
import { auth, db, storage } from '../services/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes } from "firebase/storage";
import { IRegisterUser } from 'screens/UserRegister/interfaces'

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
	user: User,
	signin: (email: string, password: string) => void,
	signout: () => void,
	signup: (userData: IRegisterUser) => void,
	loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
	user: {signed: false},
	signin: () => {},
	signout: () => {},
	signup: () => {},
	loading: true
})

const AuthProvider = ({
    children
}: any) => {
	const [user, setUser] = useState<User>({ signed: false });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const authState = onAuthStateChanged(auth, (user) => {
			// if user exists, then fetch data from the database
			if (user) {
				const user_uid = user.uid
				getDoc(doc(db, "users", user_uid))
					.then(fetched_data => {
						const user_data = fetched_data.data()
						setUser({ ...user_data, user_uid: user_uid, signed: true })
					})
					.catch(error => console.warn(error))
					.finally(() => setLoading(false))
			} else {
				setUser({ signed: false })
				setLoading(false)
			}
		})
		return authState
	}, [])

	const signin = (email: string, password: string) => {
		setLoading(true)
		signInWithEmailAndPassword(auth, email, password)
			.catch((error) => console.log(error.code, error.message))
	}

	const signout = () => {
		setLoading(true)
		auth.signOut()
			.catch((error) => console.warn(error.message))
	}

	const signup = async (userData: IRegisterUser) => {
		setLoading(true)
		const authResult = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
		setDoc(
			doc(db, "users", authResult.user.uid), 
			{
				full_name: userData.fullName,
				username: userData.username,
				email: userData.email,
				age: userData.age,
				phone: userData.phone,
				state: userData.uf,
				city: userData.city,
				address: userData.street,
			}
		)

		const img = await fetch(userData.imageUri);
		const blob = await img.blob();
		const userRef = ref(storage, `user/${authResult.user.uid}/profilePicture.png`);
		try {
			await uploadBytes(userRef, blob);
		} catch (error) {
			console.warn(error)
		}
	}

	return <AuthContext.Provider value={{ user, signin, signout, signup, loading }}>{children}</AuthContext.Provider>
}

export default AuthProvider
