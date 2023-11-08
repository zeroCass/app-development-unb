import { useFocusEffect } from '@react-navigation/native'
import { doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { PetInfoProps } from 'routes/types'
import { db } from '../../services/firebase'
import { PetData } from '../Adopt'
import PetPhoto from './components/PetPhoto'

import { MaterialIcons } from '@expo/vector-icons'
import MainButton from '../../components/MainButton'

const PetInfo = ({ route }: PetInfoProps) => {
	const [loading, setLoading] = useState(false)
	const petParam = route.params.pet
	const [petInfo, setPetInfo] = useState<PetData>({} as PetData)
	const [adoptionRequirements, setAdoptionRequirements] = useState<string | undefined>('')

	// fetchData
	useFocusEffect(
		useCallback(() => {
			fetchData()
		}, [])
	)

	useEffect(() => {
		if (!petInfo?.adoptionPreferences) return
		configRequirements()
	}, [petInfo])

	const fetchData = async () => {
		if (!petInfo) return
		setLoading(true)
		try {
			const data = await getDoc(doc(db, 'pet', petParam.id))
			const petData = { id: data.id, ...data.data() } as PetData
			setPetInfo(petData)
			console.log('pet temperamento: ', petInfo.temper)
		} catch (error) {
			console.warn('petFetch data error: ', error)
		} finally {
			setLoading(false)
		}
	}

	const arrayToString = (temp: string[] | undefined): string | undefined => {
		if (!temp || temp.length < 1) return
		if (temp.length === 1) return temp[0]
		const lastWord = temp.pop()
		const tempConcat = temp.join(', ') + ' e ' + lastWord
		return tempConcat
	}

	const configRequirements = () => {
		const array = []
		if (petInfo.adoptionPreferences?.adoptionTerm) array.push('Termo de ação')
		if (petInfo.adoptionPreferences?.housePhotos) array.push('fotos da casa')
		if (petInfo.adoptionPreferences?.testVisit) array.push('visita prévia')
		if (petInfo.adoptionPreferences?.followUpVisits) {
			if (petInfo.adoptionPreferences?.followUpVisits?.sixMonths)
				array.push('acompanhmento de seis meses')
			else if (petInfo.adoptionPreferences?.followUpVisits?.threeMonths)
				array.push('acompanhmento de três meses')
			else if (petInfo.adoptionPreferences?.followUpVisits?.threeMonths)
				array.push('acompanhmento de um mês')
		}
		setAdoptionRequirements(arrayToString(array))
	}

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
				<ActivityIndicator size={100} />
			</View>
		)
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.imgContainer}>
				<PetPhoto petId={petInfo.id} />
			</View>
			<View style={styles.container}>
				<FavoriteButton />
				<ScrollView>
					<Text style={styles.title}>{petInfo.name}</Text>
					<View style={styles.section_3}>
						<View>
							<Text style={styles.subTitle}>SEXO</Text>
							<Text style={styles.fontDefault}>{petInfo.sex}</Text>
						</View>
						<View>
							<Text style={styles.subTitle}>PORTE</Text>
							<Text style={styles.fontDefault}>{petInfo.size}</Text>
						</View>
						<View>
							<Text style={styles.subTitle}>IDADE</Text>
							<Text style={styles.fontDefault}>{petInfo.age_range}</Text>
						</View>
					</View>

					<View style={[styles.section_2, { marginTop: 16 }]}>
						<View>
							<Text style={styles.subTitle}>LOCALIZAÇÃO</Text>
							<Text style={styles.fontDefault}>ADICIONAR NO BANCO</Text>
						</View>
					</View>
					<View style={styles.break}></View>
					<View style={[styles.section_2]}>
						<View>
							<Text style={styles.subTitle}>CASTRADO</Text>
							<Text style={styles.fontDefault}>{petInfo.petHealth?.castrated ? 'Sim' : 'Não'}</Text>
						</View>
						<View>
							<Text style={styles.subTitle}>VERMIFUGADO</Text>
							<Text style={styles.fontDefault}>{petInfo.petHealth?.dewormed ? 'Sim' : 'Não'}</Text>
						</View>
					</View>

					<View style={[styles.section_2, { marginTop: 16 }]}>
						<View>
							<Text style={styles.subTitle}>VACINADO</Text>
							<Text style={styles.fontDefault}>
								{petInfo.petHealth?.vaccinated ? 'Sim' : 'Não'}
							</Text>
						</View>
						<View>
							<Text style={styles.subTitle}>DOENÇAS</Text>
							<Text style={styles.fontDefault}>TEM QUE SER ARRAY</Text>
						</View>
					</View>
					<View style={styles.break}></View>
					<View style={styles.section_2}>
						<View>
							<Text style={styles.subTitle}>TEMPERAMENTO</Text>
							<Text style={styles.fontDefault}>{arrayToString(petInfo.temper)}</Text>
						</View>
					</View>
					<View style={styles.break}></View>
					<View style={styles.section_2}>
						<View>
							<Text style={styles.subTitle}>EXIGÊNCIAS DO DOADOR</Text>
							<Text style={styles.fontDefault}>{adoptionRequirements}</Text>
						</View>
					</View>
					<View style={styles.break}></View>
					<View style={[styles.section_2, { marginBottom: 28 }]}>
						<View>
							<Text style={styles.subTitle}>MAIS SOBRE {petInfo?.name?.toUpperCase()}</Text>
							<Text style={styles.fontDefault}>{petInfo.about}</Text>
						</View>
					</View>
					<View style={styles.mainButton}>
						<MainButton
							text={'PRETENDO ADOTAR'}
							styleButton={{ backgroundColor: '#fdcf58' }}
							styleText={{ color: '#434343' }}
							onPress={() => console.log('Pretendo adotar botão')}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	)
}

const FavoriteButton = () => {
	return (
		<View style={styles.favoriteButton}>
			<MaterialIcons name='favorite-border' size={24} color='#434343' />
		</View>
	)
}

const styles = StyleSheet.create({
	imgContainer: {
		flex: 3,
	},
	container: {
		flex: 7,
		paddingHorizontal: 25,
		position: 'relative',
		zIndex: 0,
	},
	fontDefault: {
		// fontFamily: 'Roboto Regular',
		fontSize: 14,
		color: '#757575',
	},
	title: {
		marginVertical: 16,
		fontSize: 16,
		fontWeight: 'bold',
		// fontFamily: 'Roboto Medium',
		color: '#434343',
	},
	subTitle: {
		fontSize: 12,
		color: '#f7a800',
		// fontFamily: 'Roboto Regular',
		marginBottom: 4,
	},
	break: {
		width: '100%',
		height: 1,
		backgroundColor: '#e0e0e0',
		marginVertical: 16,
	},
	section_3: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	section_2: {
		flexDirection: 'row',
		gap: 100,
	},
	favoriteButton: {
		position: 'absolute',
		right: 20,
		top: -25,
		width: 56,
		height: 56,
		borderRadius: 50,
		backgroundColor: '#fafafa',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#434343',
		elevation: 5,
		zIndex: 100,
	},
	mainButton: {
		alignItems: 'center',
		marginBottom: 28,
	},
})

export default PetInfo
