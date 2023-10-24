import { Entypo } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Adopt from '../screens/Adopt'
import PetInfo from '../screens/Adopt/PetInfo'
import PetRegistration from '../screens/PetRegistration'
import Profile from '../screens/Profile'

import { TouchableOpacity } from 'react-native'
import CustomDrawerContent from './CustomDrawerContent'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const AdoptStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Adopt' component={Adopt} 
				options={({ navigation }) => ({
					title: ' Adotar',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
							<Entypo name="menu" size={24} color="black" />
						</TouchableOpacity>
					)
				})} />
			<Stack.Screen name='PetInfo' component={PetInfo} 
				options={({ route }: any) => ({
					title: route.params.pet.name ? route.params.pet.name : 'Informações do Pet'
				})}
			/>
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
				options={{
					title: 'Adotar',
					headerShown: false
				}}
			/>
		</Drawer.Navigator>
	)
}

export default DrawerRoutes
