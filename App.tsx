import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import Routes from './src/routes'
import { app } from './src/services/firebase'

export default function App() {
	console.log(app)
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	)
}
