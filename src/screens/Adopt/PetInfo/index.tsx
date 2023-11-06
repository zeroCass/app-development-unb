import { Text, View } from 'react-native'
import { PetInfoProps } from 'routes/types'

const PetInfo = ({ route }: PetInfoProps) => {
	const pet = route.params.pet
	return (
		<View>
			<Text>Foto do Anibal</Text>
			<Text>Nome: {pet.name}</Text>
			<Text>Sexo: {pet.gender}</Text>
			<Text>Localidade: {pet.location}</Text>
		</View>
	)
}

export default PetInfo
