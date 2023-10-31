import { NavigationContainer } from '@react-navigation/native'
import DrawerRoutes from './drawer.routes'

const Routes = () => {
	return (
		<NavigationContainer>
			<DrawerRoutes />
		</NavigationContainer>
	)
}

export default Routes
