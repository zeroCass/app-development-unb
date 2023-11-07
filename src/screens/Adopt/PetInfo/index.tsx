import { useFocusEffect } from '@react-navigation/native'
import { doc, getDoc } from 'firebase/firestore'
import { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PetInfoProps } from 'routes/types'
import { PetData } from '..'
import { db } from '../../../services/firebase'

const PetInfo = ({ route }: PetInfoProps) => {
	const petParam = route.params.pet
	const [petInfo, setPetInfo] = useState<PetData>({} as PetData)

	// fetchData
	useFocusEffect(
		useCallback(() => {
			fetchData()
		}, [])
	)

	const fetchData = async () => {
		const data = await getDoc(doc(db, 'pet', petParam.id))
		const petData = { id: data.id, ...data.data() } as PetData
		setPetInfo(petData)
	}

	return (
		<View style={styles.container}>
			<Text>Foto do Animal</Text>
			<Text>Nome: {petInfo.name}</Text>
			<Text>Sexo: {petInfo.sex}</Text>
			<Text>Porte: {petInfo.size}</Text>
			<Text>Castrado: {petInfo.petHealth?.castrated}</Text>
			<Text>Vermifugado: {petInfo.petHealth?.dewormed}</Text>
			<Text>Doenças: {petInfo.petHealth?.diseases}</Text>
			<Text>Temperamento: {petInfo.temper}</Text>
			<Text>
				Mais sobre {petInfo.name}: {petInfo.about}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default PetInfo
