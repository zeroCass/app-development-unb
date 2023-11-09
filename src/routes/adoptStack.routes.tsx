import { Entypo } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native'

import Adopt from '../screens/Adopt'
import PetInfo from '../screens/PetInfo'

import { AdoptParamList } from './types'

const Stack = createNativeStackNavigator<AdoptParamList>()

const AdoptStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Adopt'
				component={Adopt}
				options={({ navigation }) => ({
					title: ' Adotar',
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
				name='PetInfo'
				component={PetInfo}
				options={({ route }) => ({
					title: route.params.pet.name ? route.params.pet.name : 'Informações do Pet',
					headerStyle: {
						backgroundColor: '#ffd358',
					},
					statusBarColor: '#f7a800',
					headerRight: () => (
						<TouchableOpacity
							onPress={() => console.log('Faz algo que eu n sei como vai ser feito')}
						>
							<Entypo name='share' size={24} color='#434343' />
						</TouchableOpacity>
					),
				})}
			/>
		</Stack.Navigator>
	)
}

export default AdoptStack
