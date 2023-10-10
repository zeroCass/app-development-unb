import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import Routes from './src/routes'
import firebase from './src/services/firebase'

export default function App() {
	console.log(firebase)
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	)
}
