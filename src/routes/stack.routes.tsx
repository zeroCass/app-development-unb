import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth'

import { ActivityIndicator, View } from 'react-native'
import Login from '../screens/Login'
import UserRegister from '../screens/UserRegister'
import DrawerRoutes from './drawer.routes'

const Stack = createNativeStackNavigator()

const StackRoutes = () => {
	const { user, loading} = useContext(AuthContext)
	console.warn(loading)
	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#666" />
			</View>
		)
	}

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
