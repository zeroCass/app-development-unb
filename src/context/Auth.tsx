import { signInWithEmailAndPassword } from 'firebase/auth'
import { createContext, useState } from 'react'
import { auth } from '../services/firebase'

type User = {
	auth: boolean
}

type AuthContextType = {
	user: User,
	signin: (email: string, password: string) => void,
	signout: () => void,
	alreadSignin: (user: any) => void,
}

export const AuthContext = createContext<AuthContextType>({
	user: {auth: false},
	signin: () => {},
	signout: () => {},
	alreadSignin: () => {},
})

const AuthProvider = ({
    children
}: any) => {
	const [user, setUser] = useState<User>({ auth: false })

	const signin = (email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const userResponse = userCredentials.user
				console.log(userResponse)
				setUser({ ...userResponse, auth: true })
			})
			.catch((error) => console.log(error.code, error.message))
	}

	const signout = () => {
		auth.signOut()
			.then(() => {
				setUser({ auth: false })
			})
			.catch((error) => console.warn(error.message))
		
	}

	const alreadSignin = (user: any) => {
		setUser({ ...user, auth: true })
	}

	return <AuthContext.Provider value={{ user, signin, signout, alreadSignin }}>{children}</AuthContext.Provider>
}

export default AuthProvider
