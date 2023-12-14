import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { navigationRef } from '../routes/navigationRef'
import RootRoutes from './drawer.routes'

const Routes = () => {
	const linking = {
		prefixes: [Linking.createURL('/')],
		config: {
			screens: {
				Notifications: 'notifications',
			},
		},
	}

	return (
		<NavigationContainer
			linking={linking}
			ref={navigationRef}
			onReady={() => {
				console.log('navigation carregou !!!')
			}}
		>
			<RootRoutes />
		</NavigationContainer>
	)
}

export default Routes
