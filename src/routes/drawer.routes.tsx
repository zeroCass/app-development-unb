import { createDrawerNavigator } from '@react-navigation/drawer'
import PetRegistration from '../screens/PetRegistration'
import Profile from '../screens/Profile'

import CustomDrawerContent from './CustomDrawerContent'

const Drawer = createDrawerNavigator()

const DrawerRoutes = () => {
	return (
		<Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
			<Drawer.Screen
				name='Profile'
				component={Profile}
				options={{
					title: 'Meu Perfil',
					headerStyle: {
						backgroundColor: '#88c9bf',
					},
				}}
			/>
			<Drawer.Screen
				name='PetRegistration'
				component={PetRegistration}
				options={{
					title: 'Cadastro do Animal',
					headerStyle: {
						backgroundColor: '#ffd358',
					},
				}}
			/>
		</Drawer.Navigator>
	)
}

export default DrawerRoutes
