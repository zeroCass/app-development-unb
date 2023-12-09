import { Entypo } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native'
import { ChatParamList } from './types'
import Chat from '../screens/Chat'
import ActualChat from '../screens/Chat/components/ActualChat'


const Stack = createNativeStackNavigator<ChatParamList>()

const ChatStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Chat'
				component={Chat}
				options={({ navigation }) => ({
					title: 'Chat',
					headerStyle: {
						backgroundColor: '#ffd358',
					},
					statusBarColor: '#f7a800',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
							<Entypo name='menu' size={24} color='black' />
						</TouchableOpacity>
					),
				})}
			/>
			<Stack.Screen
				name='ActualChat'
				component={ActualChat}
				options={({ route }) => ({
					title: route.params.chat.otherUserUsername,
					headerStyle: {
						backgroundColor: '#ffd358',
					},
					statusBarColor: '#f7a800',
				})}
			/>
		</Stack.Navigator>
	)
}

export default ChatStack
