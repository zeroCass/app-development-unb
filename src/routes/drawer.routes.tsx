import { createDrawerNavigator } from '@react-navigation/drawer'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth'

import CustomDrawer from '../components/CustomDrawer'
import Login from '../screens/Login'
import PetRegistration from '../screens/PetRegistration'
import Profile from '../screens/Profile'
import UserRegister from '../screens/UserRegister'
import AdoptStack from './adoptStack.routes'

import type { DrawerContentComponentProps } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

const DrawerRoutes = () => {
	const { user } = useContext(AuthContext)

	return (
		<Drawer.Navigator
			drawerContent={(props: DrawerContentComponentProps) => <CustomDrawer {...props} />}
		>
			{!user.signed ? (
				<Drawer.Group>
					<Drawer.Screen
						name='Login'
						component={Login}
						options={{
							headerStyle: {
								backgroundColor: '#88c9bf',
							},
						}}
					/>
					<Drawer.Screen
						name='UserRegister'
						component={UserRegister}
						options={{
							title: 'Cadastro Pessoal',
						}}
					/>
				</Drawer.Group>
			) : (
				<Drawer.Group>
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
							headerShown: false,
						}}
					/>
				</Drawer.Group>
			)}
		</Drawer.Navigator>
	)
}

export default DrawerRoutes
