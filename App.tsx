// import { NavigationContainer } from '@react-navigation/native'
import * as ExpoLinking from 'expo-linking'

import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import { AppProvider } from './src/context/Global'
import Routes from './src/routes'
// import { navigationRef, useNavigationReady } from './src/routes/navigationRef'

const prefix = ExpoLinking.createURL('/')
console.log(prefix)

export default function App() {
	// const { setIsReady } = useNavigationReady()
	return (
		<AppProvider>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</AppProvider>
	)
}
