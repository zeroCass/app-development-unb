import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import Routes from './src/routes'
import NotificationsProvider from './src/context/Notifications'

export default function App() {

	return (
		<NotificationsProvider>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</NotificationsProvider>
	)
}
