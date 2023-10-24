import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore"
import { createContext, useEffect, useState } from 'react'
import { auth, db } from '../services/firebase'

type User = {
	full_name?: string
	username?: string 
	age?: number
	email?: string
	phone?: string
	city?: string
	state?: string
	address?: string
	signed: boolean
}

type AuthContextType = {
	user: User,
	signin: (email: string, password: string) => void,
	signout: () => void,
	loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
	user: {signed: false},
	signin: () => {},
	signout: () => {},
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
						setUser({ ...user_data, signed: true })
					})
					.catch(error => console.warn(error))
					.finally(() => setLoading(false))
			}
		})
		return authState
	}, [])

	const signin = (email: string, password: string) => {
		setLoading(true)
		signInWithEmailAndPassword(auth, email, password)
			.catch((error) => console.log(error.code, error.message))
			.finally(() => setLoading(false))
	}

	const signout = () => {
		setLoading(true)
		auth.signOut()
			.then(() => {
				setUser({ signed: false })
			})
			.catch((error) => console.warn(error.message))
			.finally(() => setLoading(false))
	}

	return <AuthContext.Provider value={{ user, signin, signout, loading }}>{children}</AuthContext.Provider>
}

export default AuthProvider
