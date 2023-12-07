import { DrawerContentComponentProps, createDrawerNavigator } from '@react-navigation/drawer'
import { useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import CustomDrawer from '../components/CustomDrawer'
import { AuthContext } from '../context/Auth'
import Chat from '../screens/Chat'
import Login from '../screens/Login'
import Notifications from '../screens/Notifications'
import PetRegistration from '../screens/PetRegistration'
import Profile from '../screens/Profile'
import UserRegister from '../screens/UserRegister'

import AdoptStack from './adoptStack.routes'
import { RootDrawerParamList } from './types'

const RootDrawer = createDrawerNavigator<RootDrawerParamList>()

const RootRoutes = () => {
	const { user, loading } = useContext(AuthContext)

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' color='#666' />
			</View>
		)
	}

	return (
		<RootDrawer.Navigator
			drawerContent={(props: DrawerContentComponentProps) => <CustomDrawer {...props} />}
		>
			{!user.signed ? (
				<RootDrawer.Group>
					<RootDrawer.Screen
						name='Login'
						component={Login}
						options={{
							headerStyle: {
								backgroundColor: '#88c9bf',
							},
						}}
					/>
					<RootDrawer.Screen
						name='UserRegister'
						component={UserRegister}
						options={{
							title: 'Cadastro Pessoal',
						}}
					/>
				</RootDrawer.Group>
			) : (
				<RootDrawer.Group>
					<RootDrawer.Screen
						name='Profile'
						component={Profile}
						options={{
							title: 'Meu Perfil',
							headerStyle: {
								backgroundColor: '#88c9bf',
							},
						}}
					/>
					<RootDrawer.Screen
						name='PetRegistration'
						component={PetRegistration}
						options={{
							title: 'Cadastro do Animal',
							headerStyle: {
								backgroundColor: '#ffd358',
							},
						}}
					/>
					<RootDrawer.Screen
						name='AdoptStack'
						component={AdoptStack}
						options={{
							title: 'Adotar',
							headerShown: false,
						}}
					/>
					<RootDrawer.Screen
						name='Notifications'
						component={Notifications}
						options={{
							title: 'Notificações',
							headerShown: false,
						}}
					/>
					<RootDrawer.Screen
						name='Chat'
						component={Chat}
						options={{
							title: 'Chat',
							headerShown: false,
						}}
					/>
				</RootDrawer.Group>
			)}
		</RootDrawer.Navigator>
	)
}

export default RootRoutes
