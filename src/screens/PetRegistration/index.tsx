import { MaterialIcons } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { PetRegistrationProps } from 'routes/types'
import GenericInput from '../../components/GenericInput'
import MainButton from '../../components/MainButton'
import { AuthContext } from '../../context/Auth'
import Checkbox from './components/Checkbox'
import PhotoComponent from './components/PhotoComponent'
import RadioButton from './components/RadioButton'
import {
	CommonData,
	TemperamentType,
	adoptionPreferences,
	followUpVisitsPreferences,
} from './interfaces'
import { registerPet } from './services'

type CommonComponentsProps = {
	commonData: CommonData
	onChangeData: (attribute: string, value: string | boolean | string[]) => void
}

const CommonComponents = ({ onChangeData, commonData }: CommonComponentsProps) => {
	const [diseaseInput, setDiseaseInput] = useState('')

	const handleAddDisease = () => {
		if (diseaseInput.trim() !== '') {
			const diseaseList = [...commonData.diseases, diseaseInput.trim()]
			onChangeData('diseases', diseaseList)
			setDiseaseInput('')
		}
	}

	const handleRemoveDisease = (index: any) => {
		const updatedList = [...commonData.diseases]
		updatedList.splice(index, 1)
		onChangeData('diseases', updatedList)
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
					<Checkbox
						checked={commonData.temperament['Brincalhão']}
						text={'Brincalhão'}
						onCheck={() => {
							onChangeData('temperament', 'Brincalhão')
						}}
					/>
					<Checkbox
						checked={commonData.temperament['Tímido']}
						text={'Tímido'}
						onCheck={() => onChangeData('temperament', 'Tímido')}
					/>
					<Checkbox
						checked={commonData.temperament['Calmo']}
						text={'Calmo'}
						onCheck={() => onChangeData('temperament', 'Calmo')}
					/>
				</View>
				<View style={styles.checkGroup}>
					<Checkbox
						checked={commonData.temperament['Guarda']}
						text={'Guarda'}
						onCheck={() => onChangeData('temperament', 'Guarda')}
					/>
					<Checkbox
						checked={commonData.temperament['Amoroso']}
						text={'Amoroso'}
						onCheck={() => onChangeData('temperament', 'Amoroso')}
					/>
					<Checkbox
						checked={commonData.temperament['Preguiçoso']}
						text={'Preguiçoso'}
						onCheck={() => onChangeData('temperament', 'Preguiçoso')}
					/>
				</View>
			</>
			<>
				<Text style={styles.subTitle}>SAÚDE</Text>
				<View style={styles.checkGroup}>
					<Checkbox
						checked={commonData.vaccinated}
						text={'Vacinado'}
						onCheck={() => onChangeData('vaccinated', !commonData.vaccinated)}
					/>
					<Checkbox
						checked={commonData.dewormed}
						text={'Vermifugado'}
						onCheck={() => onChangeData('dewormed', !commonData.dewormed)}
					/>
				</View>
				<View style={styles.checkGroup}>
					<Checkbox
						checked={commonData.castrated}
						text={'Castrado'}
						onCheck={() => onChangeData('castrated', !commonData.castrated)}
					/>
					<Checkbox
						checked={commonData.sick}
						text={'Doente'}
						onCheck={() => {
							onChangeData('sick', !commonData.sick)
							onChangeData('diseases', [])
						}}
					/>
				</View>
				{commonData.sick && (
					<View style={{ marginBottom: 20 }}>
						<GenericInput
							placeholder='Digite uma doença'
							value={diseaseInput}
							onChangeText={(text) => setDiseaseInput(text)}
						/>
						<View style={{ flex: 1, alignItems: 'center', margin: 16 }}>
							<MainButton
								styleButton={{ backgroundColor: '#ffd358' }}
								text='Adicionar Doença'
								onPress={handleAddDisease}
							/>
						</View>

						<Text>Lista de Doenças:</Text>
						{commonData.diseases.map((disease, index) => (
							<View
								key={index}
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									padding: 10,
									marginBottom: 2,
									borderBottomWidth: 2,
									borderColor: '#000',
								}}
							>
								<View>
									<Text>{disease}</Text>
								</View>
								<Pressable onPress={() => handleRemoveDisease(index)}>
									<MaterialIcons name='delete' size={24} color='red' />
								</Pressable>
							</View>
						))}
						{/* Save diseaseList to the database or use it as needed */}
					</View>
				)}
			</>
		</>
	)
}

type AdoptionProps = {
	adoptionData: adoptionPreferences
	onChangeData: (attribute: string, monthsNumber?: string) => void
	postAdoptionVisit: boolean
	setPostAdoptionVisit: (postAdoptionVisi: boolean) => void
}

const Adoption = ({
	adoptionData,
	onChangeData,
	postAdoptionVisit,
	setPostAdoptionVisit,
}: AdoptionProps) => {
	return (
		<>
			<Text style={styles.subTitle}>EXIGÊNCIAS PARA ADOÇÃO</Text>
			<View style={styles.checkGroupVertical}>
				<Checkbox
					checked={adoptionData.adoptionTerm}
					text={'Termo de adoção'}
					onCheck={() => onChangeData('adoptionTerm')}
				/>
				<Checkbox
					checked={adoptionData.housePhotos}
					text={'Fotos da casa'}
					onCheck={() => onChangeData('housePhotos')}
				/>
				<Checkbox
					checked={adoptionData.testVisit}
					text={'Visita prévia do animal'}
					onCheck={() => onChangeData('testVisit')}
				/>
				<Checkbox
					checked={postAdoptionVisit}
					text={'Acompanhamento pós adoção'}
					onCheck={() => setPostAdoptionVisit(!postAdoptionVisit)}
				/>
				<View style={styles.subCheckGroupVertical}>
					<Checkbox
						disabled={!postAdoptionVisit}
						checked={adoptionData.followUpVisits.oneMonth}
						text={'1 mês'}
						onCheck={() => onChangeData('followUpVisits', 'oneMonth')}
					/>
					<Checkbox
						disabled={!postAdoptionVisit}
						checked={adoptionData.followUpVisits.threeMonths}
						text={'3 meses'}
						onCheck={() => onChangeData('followUpVisits', 'threeMonths')}
					/>
					<Checkbox
						disabled={!postAdoptionVisit}
						checked={adoptionData.followUpVisits.sixMonths}
						text={'6 meses'}
						onCheck={() => onChangeData('followUpVisits', 'sixMonths')}
					/>
				</View>
			</View>
		</>
	)
}

type ImagesType = {
	id: number
	imageUri: string
}

const PetRegistration = ({ navigation }: PetRegistrationProps) => {
	const { user } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [petName, setPetName] = useState('')
	const [location, setLocation] = useState('')
	const [willBeAdopted, setWillBeAdopted] = useState(false)
	const [petStory, setPetStory] = useState('')
	const [images, setImages] = useState<ImagesType[]>([])
	const [postAdoptionVisit, setPostAdoptionVisit] = useState(false)
	const [adoptionData, setAdoption] = useState<adoptionPreferences>({
		adoptionTerm: false,
		housePhotos: false,
		testVisit: false,
		followUpVisits: {
			oneMonth: false,
			threeMonths: false,
			sixMonths: false,
		},
	})
	const [commonData, setCommonData] = useState<CommonData>({
		temperament: {
			Brincalhão: false,
			Tímido: false,
			Calmo: false,
			Guarda: false,
			Amoroso: false,
			Preguiçoso: false,
		},
		specie: '',
		gender: '',
		size: '',
		age: '',
		vaccinated: false,
		dewormed: false,
		castrated: false,
		sick: false,
		diseases: [],
	})

	const initialState = () => {
		setPetName('')
		setPetStory('')
		setLocation('')
		setImages([])
		setPostAdoptionVisit(false)
		setAdoption({
			adoptionTerm: false,
			housePhotos: false,
			testVisit: false,
			followUpVisits: {
				oneMonth: false,
				threeMonths: false,
				sixMonths: false,
			},
		})
		setCommonData({
			temperament: {
				Brincalhão: false,
				Tímido: false,
				Calmo: false,
				Guarda: false,
				Amoroso: false,
				Preguiçoso: false,
			},
			specie: '',
			gender: '',
			size: '',
			age: '',
			vaccinated: false,
			dewormed: false,
			castrated: false,
			sick: false,
			diseases: [],
		})
	}

	const convertToArray = (object: TemperamentType): string[] => {
		const array = []
		for (const key in object) {
			if (object[key as keyof TemperamentType] === true) array.push(key)
		}
		return array
	}

	const handleSendData = async () => {
		setLoading(true)
		const result = await registerPet(
			{
				about: petStory,
				age_range: commonData.age,
				name: petName,
				location,
				sex: commonData.gender,
				size: commonData.size,
				temper: convertToArray(commonData.temperament),
				species: commonData.specie,
				owner: user.user_uid,
				willBeAdopted,
				adoptionPreferences: adoptionData,
				petHealth: {
					castrated: commonData.castrated,
					dewormed: commonData.dewormed,
					diseases: commonData.diseases,
					sick: commonData.sick,
					vaccinated: commonData.vaccinated,
				},
			},
			images
		)
		setLoading(false)
		if (result.type == 'error') {
			console.warn(result.error)
			Alert.alert(
				'Erro ao cadastrar animal',
				`${result.error}`,
				[
					{
						text: 'Ok',
					},
				],
				{
					cancelable: true,
				}
			)
		} else {
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
			initialState()
		}
	}

	const handleAdoptionData = (attribute: string, monthsNumber?: string) => {
		if (attribute === 'followUpVisits' && monthsNumber) {
			const oldValue = adoptionData[attribute][monthsNumber as keyof followUpVisitsPreferences]
			const newValue = {
				...adoptionData,
				[attribute]: {
					...adoptionData[attribute],
					[monthsNumber]: !oldValue,
				},
			}
			return setAdoption(newValue)
		}
		setAdoption((prevState) => ({
			...prevState,
			[attribute]: !adoptionData[attribute as keyof adoptionPreferences],
		}))
	}

	const handleCommonData = (attribute: string, value: string | boolean | string[]) => {
		if (attribute === 'temperament') {
			const newValue = {
				...commonData.temperament,
				[value as keyof TemperamentType]: !commonData.temperament[value as keyof TemperamentType],
			}
			return setCommonData((prevState) => ({ ...prevState, temperament: newValue }))
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
					<View style={[styles.section, { marginTop: 20 }]}>
						<GenericInput
							style={{ marginBottom: 20 }}
							placeholder={'Nome do Animal'}
							label={'Nome do Animal'}
							labelStyle={{ color: '#f7a800' }}
							onChangeText={(text: string) => setPetName(text)}
							value={petName}
						/>
						<GenericInput
							style={{ marginBottom: 20 }}
							placeholder={'Localização do Animal'}
							label={'Localização'}
							labelStyle={{ color: '#f7a800' }}
							onChangeText={(text: string) => setLocation(text)}
							value={location}
						/>
					</View>
					<PhotoComponent
						images={images}
						onAddImage={(images: ImagesType[]) =>
							setImages((prevState) => [...(prevState as ImagesType[]), ...images])
						}
						onRemoveImage={(images: ImagesType[]) => setImages(images)}
					/>
					<CommonComponents
						commonData={commonData}
						onChangeData={(attribute: string, value: string | boolean | string[]) =>
							handleCommonData(attribute, value)
						}
					/>
					<View style={styles.RadioGroup}>
						<Text style={styles.title}>Adoção</Text>
						<Text style={styles.subTitle}>SERÁ COLOADO PARA ADOÇÃO</Text>
						<RadioButton
							value={willBeAdopted ? 'Sim' : 'Não'}
							options={['Sim', 'Não']}
							onPress={(boolean: string) => {
								if (boolean === 'Sim') setWillBeAdopted(true)
								if (boolean === 'Não') setWillBeAdopted(false)
								setAdoption({
									adoptionTerm: false,
									housePhotos: false,
									testVisit: false,
									followUpVisits: {
										oneMonth: false,
										threeMonths: false,
										sixMonths: false,
									},
								})
							}}
						/>
					</View>
					{willBeAdopted && (
						<Adoption
							adoptionData={adoptionData}
							onChangeData={(attribute: string, monthNumber?: string) =>
								handleAdoptionData(attribute, monthNumber)
							}
							postAdoptionVisit={postAdoptionVisit}
							setPostAdoptionVisit={() => setPostAdoptionVisit(!postAdoptionVisit)}
						/>
					)}
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
							text={'Registrar'}
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
