import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import NotificationsProvider from './src/context/Notifications'
import Routes from './src/routes'

export default function App() {
	return (
		<AuthProvider>
			<NotificationsProvider>
				<Routes />
			</NotificationsProvider>
		</AuthProvider>
	)
}
