import { createContext, useState } from 'react'

export const AuthContext = createContext({})

const AuthProvider = ({
    children
}: any) => {
	const [user, setUser] = useState({ auth: false })

	const signin = () => {
		setUser({ auth: true })
	}

	const signout = () => {
		setUser({ auth: false })
	}

	return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>
}

export default AuthProvider
