import { Entypo } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native'

import Adopt from '../screens/Adopt'
import PetInfo from '../screens/Adopt/PetInfo'

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
				options={({ route }: any) => ({
					title: route.params.pet.name ? route.params.pet.name : 'Informações do Pet',
				})}
			/>
		</Stack.Navigator>
	)
}

export default AdoptStack
