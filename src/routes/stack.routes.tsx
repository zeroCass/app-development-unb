import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth'

import Login from '../screens/Login'
import UserRegister from '../screens/UserRegister'
import DrawerRoutes from './drawer.routes'

const Stack = createNativeStackNavigator()

const StackRoutes = () => {
	const { user } = useContext(AuthContext)

	return (
		<Stack.Navigator initialRouteName='Login'>
			{!user.signed ? (
				<Stack.Group>
					<Stack.Screen
						name='Login'
						component={Login}
						options={{
							headerStyle: {
								backgroundColor: '#88c9bf',
							},
						}}
					/>
					<Stack.Screen name='UserRegister' component={UserRegister} />
				</Stack.Group>
			) : (
				<Stack.Screen name='Home' component={DrawerRoutes} options={{ headerShown: false }} />
			)}
		</Stack.Navigator>
	)
}

export default StackRoutes
