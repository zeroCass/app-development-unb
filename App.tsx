import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import Routes from './src/routes'

export default function App() {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	)
}
