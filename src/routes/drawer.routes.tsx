import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Adopt from '../screens/Adopt'
import PetInfo from '../screens/Adopt/PetInfo'
import PetRegistration from '../screens/PetRegistration'
import Profile from '../screens/Profile'

import CustomDrawerContent from './CustomDrawerContent'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const AdoptStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Adopt' component={Adopt} options={{ headerShown: false }} />
			<Stack.Screen name='PetInfo' component={PetInfo}/>
		</Stack.Navigator>
	)
}


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
			<Drawer.Screen
				name='AdoptStack'
				component={AdoptStack}
			/>
		</Drawer.Navigator>
	)
}

export default DrawerRoutes
