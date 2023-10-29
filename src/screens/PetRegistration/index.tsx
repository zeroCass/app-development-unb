import React, { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import GenericInput from '../../components/GenericInput'
import MainButton from '../../components/MainButton'
import Checkbox from './components/Checkbox'
import RadioButton from './components/RadioButton'
import { AntDesign } from '@expo/vector-icons'
import { registerPet } from './services'
import { AuthContext } from '../../context/Auth'
import { useContext } from 'react'
import { adoptionPreferences } from './interfaces'

const CommonComponents = ({
    onChangeData
}: any) => {
	const [temperament, setTemperament] = useState(Array())
	const [castrated, setCastrated ] = useState(false)
	const [dewormed, setDewormed ] = useState(false)
	const [diseases, setDiseases ] = useState('')
	const [sick, setSick ] = useState(false)
	const [vaccinated, setVaccinated ] = useState(false)
	const [specie, setSpecie] = useState('')
	const [gender, setGender] = useState('')
	const [size, setSize] = useState('')
	const [age, setAge] = useState('')

	// used to update the state on the father
	useEffect(() => {
			onChangeData({
				temperament,
				castrated,
				dewormed,
				diseases,
				sick,
				vaccinated,
				specie,
				gender,
				size,
				age,
			})
		}, [temperament, castrated, dewormed, diseases, sick, vaccinated,
			specie, gender, size, age]
	)

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
						value={specie}
						options={['Cachorro', 'Gato']}
						onPress={(specie: string) => setSpecie(specie)}
					/>
				</View>
				<View style={styles.RadioGroup}>
					<Text style={styles.subTitle}>SEXO</Text>
					<RadioButton
						value={gender}
						options={['Macho', 'Fêmea']}
						onPress={(gender:string) => setGender(gender)}
					/>
				</View>
				<View style={styles.RadioGroup}>
					<Text style={styles.subTitle}>PORTE</Text>
					<RadioButton
						value={size}
						options={['Pequeno', 'Médio', 'Grande']}
						onPress={(size: string) => setSize(size)}
					/>
				</View>
				<View style={styles.RadioGroup}>
					<Text style={styles.subTitle}>IDADE</Text>
					<RadioButton
						value={age}
						options={['Filhote', 'Adulto', 'Idoso']}
						onPress={(age: string) => setAge(age)}
					/>
				</View>
			</>
			<>
				<Text style={styles.subTitle}>TEMPERAMENTO</Text>
				<View style={styles.checkGroup}>
					<Checkbox text={'Brincalhão'} onPress={() => handleSetTemperament('Brincalhão')} />
					<Checkbox text={'Tímido'} onPress={() => handleSetTemperament('Tímido')} />
					<Checkbox text={'Calmo'} onPress={() => handleSetTemperament('Calmo')} />
				</View>
				<View style={styles.checkGroup}>
					<Checkbox text={'Guarda'} onPress={() => handleSetTemperament('Guarda')} />
					<Checkbox text={'Amoroso'} onPress={() => handleSetTemperament('Amoroso')} />
					<Checkbox text={'Preguiçoso'} onPress={() => handleSetTemperament('Preguiçoso')} />
				</View>
			</>
			<>
				<Text style={styles.subTitle}>SAÚDE</Text>
				<View style={styles.checkGroup}>
					<Checkbox text={'Vacinado'} onPress={() => setVaccinated(!vaccinated)} />
					<Checkbox text={'Vermifugado'} onPress={() => setDewormed(!dewormed)} />
				</View>
				<View style={styles.checkGroup}>
					<Checkbox text={'Castrado'} onPress={() => setCastrated(!castrated)} />
					<Checkbox text={'Doente'} onPress={() => setSick(!sick)} />
					<GenericInput
						style={{ marginBottom: 16 }}
						placeholder={'Doenças'}
						onChangeText={(text:string) => setDiseases(text)}
					/>
				</View>
			</>
		</>
	)
}

export type UpperButtonsProps = {
	onChangePage: any,
	toggleHelp: any
}

const UpperButtons: React.FC<UpperButtonsProps> = ({ 
	onChangePage,
	toggleHelp
}) => {
	const [activePage, setActivePage] = useState('Adoção')
	const [helpIsActive, setHelpIsActive] = useState(false)
	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'center',
				gap: 8,
				borderColor: '#e6e7e8',
				borderBottomWidth: 0.8,
				paddingBottom: 16,
			}}
		>
			<Button
				onPress={() => {
					onChangePage('Adoção')
					setActivePage('Adoção')
				}}
				title='Adoção'
				color={activePage === 'Adoção' ? '#ffd358' : '#bdbdbd'}
			/>
			<Button
				onPress={() => {
					onChangePage('Apadrinhar')
					setActivePage('Apadrinhar')
				}}
				title='Apadrinhar'
				color={activePage === 'Apadrinhar' ? '#ffd358' : '#bdbdbd'}
			/>
			<Button
				onPress={() => {
					toggleHelp(!helpIsActive)
					setHelpIsActive(!helpIsActive)
				}}
				title='Ajuda'
				color={helpIsActive === true ? '#ffd358' : '#bdbdbd'}
			/>
		</View>
	)
}

export type HelpSectionProps = {
	onChangeData: any
}

const HelpSection: React.FC<HelpSectionProps> = ({
	onChangeData
}) => {
	const [petNeeds, setPetNeeds] = useState(Array())
	const [medicine, setMedicine] = useState(Array())
	const [objets, setObjects] = useState(Array())

	useEffect(() => {
		onChangeData({
			petNeeds,
			medicine,
			objets,
		})
	}, [petNeeds, medicine, objets])

	const handleSetNeeds = (selectedNeed: string) => {
		if (petNeeds.includes(selectedNeed)) {
			setPetNeeds(petNeeds.filter((item) => item !== selectedNeed))
		} else {
			setPetNeeds([...petNeeds, selectedNeed])
		}
	}

	return (
		<>
			<Text style={styles.subTitle}>NECESSIDADES DO ANIMAL</Text>
			<View style={styles.checkGroupVertical}>
				<Checkbox text={'Alimento'} onPress={() => handleSetNeeds('Alimento')} />
				<Checkbox
					text={'Auxílio financeiro'}
					onPress={() => handleSetNeeds('Auxílio financeiro')}
				/>
				<Checkbox text={'Medicamento'} onPress={() => handleSetNeeds('Medicamento')} />
				<GenericInput
					placeholder={'Nome do medicamento'}
					onChangeText={(text: any) => setMedicine(text)}
				/>
				<Checkbox text={'Objetos'} onPress={() => handleSetNeeds('Objetos')} />
				<GenericInput
					placeholder={'Especifique o(s) objeto(s)'}
					onChangeText={(text: any) => setObjects(text)}
				/>
			</View>
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

export type AdoptionProps = {
	onChangeData: any
}

const Adoption: React.FC<AdoptionProps> = ({
	onChangeData
}) => {
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
				sixMonths: sixMonths
			}
		})
	}, [term, photos, visit, oneMonth, threeMonths, sixMonths])

	return (
		<>
			<Text style={styles.subTitle}>EXIGÊNCIAS PARA ADOÇÃO</Text>
			<View style={styles.checkGroupVertical}>
				<Checkbox text={'Termo de adoção'} onPress={() => setTerm(!term)} />
				<Checkbox text={'Fotos da casa'} onPress={() => setPhotos(!photos)} />
				<Checkbox
					text={'Visita prévia do animal'}
					onPress={() => setVisit(!visit)}
				/>
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

const Sponsor: React.FC<SponsorProps> = ({
	onChangeData
}) => {
	const [sponsorRequirements, setSponsorRequirements] = useState(Array())

	useEffect(() => {
		onChangeData({
			sponsorRequirements,
		})
	}, [sponsorRequirements])

	const handleRequirements = (selectedRequirement: string) => {
		if (sponsorRequirements.includes(selectedRequirement)) {
			setSponsorRequirements(sponsorRequirements.filter((item) => item !== selectedRequirement))
		} else {
			setSponsorRequirements([...sponsorRequirements, selectedRequirement])
		}
	}

	return (
		<>
			<Text style={styles.subTitle}>EXIGÊNCIAS PARA APANDRINHAMENTO</Text>
			<View style={styles.checkGroupVertical}>
				<Checkbox
					text={'Termo de apadrinhamento'}
					onPress={() => handleRequirements('Termo de apadrinhamento')}
				/>
				<Checkbox
					text={'Auxílio finananceiro'}
					onPress={() => handleRequirements('Auxílio finananceiro')}
				/>
				<Checkbox
					text={'Visitas ao animal'}
					onPress={() => handleRequirements('Visitas ao animal')}
				/>
			</View>
		</>
	)
}

const PetRegistration = () => {
	const { user } = useContext(AuthContext);
	const [petName, setPetName] = useState('')
	const [petStory, setPetStory] = useState('')
	const [currentPage, setCurrentPage] = useState('Adoção')
	const [helpIsActive, setHelpIsActive] = useState(false)
	const [adoptionData, setAdoption] = useState({} as adoptionPreferences)
	const [helpSectionData, setHelpSectionData] = useState({})
	const [sponsorData, setSponsorData] = useState({})
	const [commonData, setCommonData] = useState({
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

	const handleSendData = async () => {
		const result = await registerPet({
			about: petStory,
			age_range: commonData.age,
			name: petName,
			photos: [],
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
		});
		if (result.type == "error") {
			console.warn(result.error);
		} else {
			console.log('Sucesso!')
		};
	}

	const handlePageChange = (page: string) => {
		setAdoption({} as adoptionPreferences)
		setSponsorData({})
		setCurrentPage(page)
	}

	const toggleHelp = (value: boolean) => {
		setHelpSectionData({})
		setHelpIsActive(value)
	}

	return (
		<>
			<ScrollView style={{ flex: 1 }}>
				<View style={styles.container}>
					<Text style={styles.upperText}>Tenho interesse em cadastrar o animal para:</Text>
					<UpperButtons onChangePage={(page: string) => handlePageChange(page)} toggleHelp={toggleHelp} />
					<View style={styles.section}>
						<Text style={styles.title}>{currentPage}</Text>
						<GenericInput
							style={{ marginBottom: 20 }}
							placeholder={'Nome do Animal'}
							label={'Nome do Animal'}
							labelStyle={{ color: '#f7a800' }}
							onChangeText={(text:string) => setPetName(text)}
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
