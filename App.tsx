import 'react-native-gesture-handler'
import AuthProvider from './src/context/Auth'
import Routes from './src/routes'
import NotificationsProvider from './src/context/Notifications'

export default function App() {

	return (
		<AuthProvider>
			<NotificationsProvider>
				<Routes />
			</NotificationsProvider>
		</AuthProvider>
	)
}
