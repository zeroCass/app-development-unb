import { AntDesign } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import GenericInput from '../../components/GenericInput'
import MainButton from '../../components/MainButton'
import { AuthContext } from '../../context/Auth'
import Checkbox from './components/Checkbox'
import PhotoComponent from './components/PhotoComponent'
import RadioButton from './components/RadioButton'
import { adoptionPreferences } from './interfaces'
import { registerPet } from './services'

const CommonComponents = ({ onChangeData, commonData }: any) => {
	const [size, setSize] = useState('')
	const [age, setAge] = useState('')

	// used to update the state on the father
	// useEffect(() => {
	// 	onChangeData({
	// 		temperament,
	// 		castrated,
	// 		dewormed,
	// 		diseases,
	// 		sick,
	// 		vaccinated,
	// 		specie,
	// 		gender,
	// 		size,
	// 		age,
	// 	})
	// }, [temperament, castrated, dewormed, diseases, sick, vaccinated, specie, gender, size, age])

	const handleSetTemperament = (selectedTemperament:string) => {
		if (temperament.includes(selectedTemperament)) {
			setTemperament(temperament.filter((item) => item !== selectedTemperament))
		} else {
			setTemperament([...temperament, selectedTemperament])
		}
	}

	return (
		<>
			<>
				<View style={styles.RadioGroup}>
					<Text style={styles.subTitle}>ESPÉCIE</Text>
					<RadioButton
						value={commonData.specie}
						options={['Cachorro', 'Gato']}
						onPress={(specie: string) => onChangeData('specie', specie)}
					/>
				</View>
				<View style={styles.RadioGroup}>
					<Text style={styles.subTitle}>SEXO</Text>
					<RadioButton
						value={commonData.gender}
						options={['Macho', 'Fêmea']}
						onPress={(gender: string) => onChangeData('gender', gender)}
					/>
				</View>
				<View style={styles.RadioGroup}>
					<Text style={styles.subTitle}>PORTE</Text>
					<RadioButton
						value={commonData.size}
						options={['Pequeno', 'Médio', 'Grande']}
						onPress={(size: string) => onChangeData('size', size)}
					/>
				</View>
				<View style={styles.RadioGroup}>
					<Text style={styles.subTitle}>IDADE</Text>
					<RadioButton
						value={commonData.age}
						options={['Filhote', 'Adulto', 'Idoso']}
						onPress={(age: string) => onChangeData('age', age)}
					/>
				</View>
			</>
			<>
				<Text style={styles.subTitle}>TEMPERAMENTO</Text>
				<View style={styles.checkGroup}>
					<Checkbox text={'Brincalhão'} onPress={() => onChangeData('temperament', 'Brincalhão')} />
					<Checkbox text={'Tímido'} onPress={() => onChangeData('temperament', 'Tímido')} />
					<Checkbox text={'Calmo'} onPress={() => onChangeData('temperament', 'Calmo')} />
				</View>
				<View style={styles.checkGroup}>
					<Checkbox text={'Guarda'} onPress={() => onChangeData('temperament', 'Guarda')} />
					<Checkbox text={'Amoroso'} onPress={() => onChangeData('temperament', 'Amoroso')} />
					<Checkbox text={'Preguiçoso'} onPress={() => onChangeData('temperament', 'Preguiçoso')} />
				</View>
			</>
			<>
				<Text style={styles.subTitle}>SAÚDE</Text>
				<View style={styles.checkGroup}>
					<Checkbox
						text={'Vacinado'}
						onPress={() => onChangeData('vaccinated', !commonData.vaccinated)}
					/>
					<Checkbox
						text={'Vermifugado'}
						onPress={() => onChangeData('dewormed', !commonData.dewormed)}
					/>
				</View>
				<View style={styles.checkGroup}>
					<Checkbox
						text={'Castrado'}
						onPress={() => onChangeData('castrated', commonData.castrated)}
					/>
					<Checkbox text={'Doente'} onPress={() => onChangeData('sick', !commonData.sick)} />
					<GenericInput
						style={{ marginBottom: 16 }}
						placeholder={'Doenças'}
						onChangeText={(text: string) => onChangeData('diseases', text)}
						value={commonData.diseases}
					/>
				</View>
			</>
		</>
	)
}

const PhotoComponent = () => {
	return (
		<View>
			<Text style={styles.subTitle}>FOTOS DO ANIMAL</Text>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: 128,
					backgroundColor: '#f1f2f2',
					marginBottom: 20,
					borderRadius: 5,
					shadowColor: '#000',
					elevation: 5,
				}}
			>
				<AntDesign name='pluscircleo' size={24} color='#757575' />
				<Text style={{ fontFamily: 'Roboto', color: '#757575', fontSize: 14 }}>
					adicionar fotos
				</Text>
			</View>
		</View>
	)
}

type AdoptionParams = {
	adoptionTerm: boolean
	housePhotos: boolean
	testVisit: boolean
	followUpVisits: {
		oneMonth: boolean
		threeMonths: boolean
		sixMonths: boolean
	}
}

export type AdoptionProps = {
	onChangeData: (object: AdoptionParams) => void
}

const Adoption = ({ onChangeData }: AdoptionProps) => {
	const [term, setTerm] = useState(false)
	const [photos, setPhotos] = useState(false)
	const [visit, setVisit] = useState(false)
	const [oneMonth, setOneMonth] = useState(false)
	const [threeMonths, setThreeMonths] = useState(false)
	const [sixMonths, setSixMonths] = useState(false)
	const [postAdoptionVisit, setPostAdoptionVisit] = useState(false)

	useEffect(() => {
		onChangeData({
			adoptionTerm: term,
			housePhotos: photos,
			testVisit: visit,
			followUpVisits: {
				oneMonth: oneMonth,
				threeMonths: threeMonths,
				sixMonths: sixMonths,
			},
		})
	}, [term, photos, visit, oneMonth, threeMonths, sixMonths])

	return (
		<>
			<Text style={styles.subTitle}>EXIGÊNCIAS PARA ADOÇÃO</Text>
			<View style={styles.checkGroupVertical}>
				<Checkbox text={'Termo de adoção'} onPress={() => setTerm(!term)} />
				<Checkbox text={'Fotos da casa'} onPress={() => setPhotos(!photos)} />
				<Checkbox text={'Visita prévia do animal'} onPress={() => setVisit(!visit)} />
				<Checkbox
					text={'Acompanhamento pós adoção'}
					onPress={() => setPostAdoptionVisit(!postAdoptionVisit)}
				/>
				<View style={styles.subCheckGroupVertical}>
					<Checkbox text={'1 mês'} onPress={() => setOneMonth(!oneMonth)} />
					<Checkbox text={'3 meses'} onPress={() => setThreeMonths(!threeMonths)} />
					<Checkbox text={'6 meses'} onPress={() => setSixMonths(!sixMonths)} />
				</View>
			</View>
		</>
	)
}

export type SponsorProps = {
	onChangeData: any
}

type CommonData = {
	temperament: string[]
	specie: string
	gender: string
	size: string
	age: string
	vaccinated: boolean
	dewormed: boolean
	castrated: boolean
	sick: boolean
	diseases: string
}

const PetRegistration = () => {
	console.log('petregister')
	const { user } = useContext(AuthContext)
	const [petName, setPetName] = useState('')
	const [petStory, setPetStory] = useState('')
	const [imageUri, setImage] = useState('')
	const [currentPage, setCurrentPage] = useState('Adoção')
	const [helpIsActive, setHelpIsActive] = useState(false)
	const [adoptionData, setAdoption] = useState({} as adoptionPreferences)
	const [commonData, setCommonData] = useState<CommonData>({
		temperament: [],
		specie: '',
		gender: '',
		size: '',
		age: '',
		vaccinated: false,
		dewormed: false,
		castrated: false,
		sick: false,
		diseases: '',
	})

	const initialState = () => {
		setPetName('')
		setPetStory('')
		setCurrentPage('Adoção')
		setHelpIsActive(false)
		setAdoption({} as adoptionPreferences)
		setCommonData({
			temperament: [],
			specie: '',
			gender: '',
			size: '',
			age: '',
			vaccinated: false,
			dewormed: false,
			castrated: false,
			sick: false,
			diseases: '',
		})
	}

	const handleSendData = async () => {
		setLoading(true)
		console.warn('handleSendData')
		initialState()
		return
		const result = await registerPet({
			about: petStory,
			age_range: commonData.age,
			name: petName,
			photos: [imageUri],
			sex: commonData.gender,
			size: commonData.size,
			temper: commonData.temperament,
			owner: user.user_uid,
			adoptionPreferences: adoptionData,
			petHealth: {
				castrated: commonData.castrated,
				dewormed: commonData.dewormed,
				diseases: commonData.diseases,
				sick: commonData.sick,
				vaccinated: commonData.vaccinated,
			},
		})
		if (result.type == 'error') {
			console.warn(result.error)
			setLoading(false)
		} else {
			Alert.alert('Cadastro do Animal', `${petName} cadastrado com sucesso!`, [{ text: 'Ok' }], {
				cancelable: true,
			})
			initialState()
			console.log('Sucesso!')
			setLoading(false)
			// navigation.navigate('Profile') - Usado para navegar
			Alert.alert(
				'Cadastro de Animal',
				'Cadastro realizado com sucesso!',
				[
					{
						text: 'Ok',
						onPress: () => navigation.navigate('Profile'),
					},
				],
				{
					cancelable: false,
				}
			)
		}
	}

	const handleSetTemperament = (selectedTemperament: string) => {
		if (commonData.temperament.includes(selectedTemperament as string)) {
			return commonData.temperament.filter((item) => item !== selectedTemperament)
		} else {
			return [...commonData.temperament, selectedTemperament]
		}
	}

	const handleCommonData = (attribute: string, value: string | boolean | string[]) => {
		if (attribute === 'temperament') {
			const newTemperament = handleSetTemperament(value as string) as string[]
			setCommonData((prevState) => ({ ...prevState, [attribute]: newTemperament }))
		}

		setCommonData((prevState) => ({ ...prevState, [attribute]: value }))
	}

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' color='#666' />
			</View>
		)
	}

	return (
		<>
			<ScrollView style={{ flex: 1 }}>
				<View style={styles.container}>
					<View style={styles.section}>
						<Text style={styles.title}>{currentPage}</Text>
						<GenericInput
							style={{ marginBottom: 20 }}
							placeholder={'Nome do Animal'}
							label={'Nome do Animal'}
							labelStyle={{ color: '#f7a800' }}
							onChangeText={(text: string) => setPetName(text)}
							value={petName}
						/>
					</View>
					<PhotoComponent />
					<CommonComponents onChangeData={(newData: any) => setCommonData(newData)} />
					{currentPage === 'Adoção' ? (
						<Adoption onChangeData={(newData: any) => setAdoption(newData)} />
					) : (
						<Sponsor onChangeData={(newData: any) => setSponsorData(newData)} />
					)}
					{helpIsActive ? (
						<HelpSection onChangeData={(newData: any) => setHelpSectionData(newData)} />
					) : null}
					<View style={styles.section}>
						<GenericInput
							style={{ marginBottom: 20 }}
							placeholder={'Compartile a história do Animal'}
							label={'Sobre o animal'}
							labelStyle={{ color: '#f7a800' }}
							onChangeText={(text: string) => setPetStory(text)}
							value={petStory}
						/>
					</View>
					<View style={styles.buttonCenter}>
						<MainButton
							text={currentPage === 'Apadrinhar' ? 'Procurar Padrinho' : 'Colocar para Adoção'}
							styleButton={{ backgroundColor: '#ffd358', marginTop: 4 }}
							onPress={handleSendData}
						/>
					</View>
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: 'blue',
		// alignItems: 'center'
	},
	container: {
		flex: 1,
		marginHorizontal: 24,
	},
	upperText: {
		fontFamily: 'Roboto',
		fontSize: 14,
		color: '#757575',
		marginTop: 16,
		marginBottom: 16,
	},
	section: {},
	subTitle: {
		color: '#f7a800',
		fontFamily: 'Roboto',
		fontSize: 12,
		marginBottom: 16,
	},
	title: {
		fontSize: 16,
		fontFamily: 'Roboto',
		fontWeight: '500',
		marginTop: 16,
		marginBottom: 20,
	},
	checkGroup: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
		marginBottom: 20,
	},
	checkGroupVertical: {
		flex: 1,
		flexDirection: 'column',
		gap: 16,
		marginBottom: 28,
	},
	subCheckGroupVertical: {
		flex: 1,
		flexDirection: 'column',
		gap: 16,
		marginLeft: 50,
	},
	RadioGroup: {
		flexDirection: 'column',
		marginBottom: 20,
	},
	buttonCenter: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24,
	},
})

export default PetRegistration
