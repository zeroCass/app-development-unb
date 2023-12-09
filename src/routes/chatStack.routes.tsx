import { Entypo } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native'

import Chat from '../screens/Chat'

import { ChatParamList } from './types'

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

            {/* Vai ser a screen do chat mesmo */}
			{/* <Stack.Screen
				name='PetInfo'
				component={PetInfo}
				options={({ route }) => ({
					title: route.params.pet.name ? route.params.pet.name : 'Informações do Pet',
					headerStyle: {
						backgroundColor: route.params.pet.owner ? '#cfe9e5' : '#ffd358',
					},
					statusBarColor: route.params.pet.owner ? '#88c9bf' : '#f7a800',
					headerRight: () => (
						<TouchableOpacity
							onPress={() => console.log('Faz algo que eu n sei como vai ser feito')}
						>
							<Entypo name='share' size={24} color='#434343' />
						</TouchableOpacity>
					),
				})}
			/> */}
		</Stack.Navigator>
	)
}

export default ChatStack
