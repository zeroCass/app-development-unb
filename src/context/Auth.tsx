import { createContext, useState } from 'react'

type User = {
	auth: boolean
}

type AuthContextType = {
	user: User,
	signin: () => void,
	signout: () => void,
}

export const AuthContext = createContext<AuthContextType>({
	user: {auth: false},
	signin: () => {},
	signout: () => {},
})

const AuthProvider = ({
    children
}: any) => {
	const [user, setUser] = useState<User>({ auth: false })

	const signin = () => {
		setUser({ auth: true })
	}

	const signout = () => {
		setUser({ auth: false })
	}

	return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>
}

export default AuthProvider
