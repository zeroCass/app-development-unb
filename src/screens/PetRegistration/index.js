import { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import GenericInput from '../../components/GenericInput'
import MainButton from '../../components/MainButton'
import TopSideMenu from '../../components/TopSideMenu'
import Checkbox from './components/Checkbox'
import RadioButton from './components/RadioButton'

import { AntDesign } from '@expo/vector-icons'

const CommonComponents = ({ onChangeData }) => {
    const [temperament, setTemperament] = useState([])
    const [specie, setSpecie] = useState('')
    const [gender, setGender] = useState('')
    const [size, setSize] = useState('')
    const [age, setAge] = useState('')

    // used to update the state on the father
    useEffect(() => {
        onChangeData({
            temperament,
            specie,
            gender,
            size,
            age,
        })
    }, [temperament, specie, gender, size, age])


    const handleSetTemperament = (selectedTemperament) => {
        if (temperament.includes(selectedTemperament)) {
            setTemperament(temperament.filter(item => item !== selectedTemperament))
        } else {
            setTemperament([...temperament, selectedTemperament])
        } 
    }

    return (
        <>
            <>
                <View style={styles.RadioGroup}>
                    <Text style={styles.subTitle}>ESPÉCIE</Text>
                    <RadioButton value={specie} options={['Cachorro', 'Gato']} onPress={(specie) => setSpecie(specie)} />
                </View>
                <View style={styles.RadioGroup}>
                    <Text style={styles.subTitle}>SEXO</Text>
                    <RadioButton value={gender} options={['Macho', 'Fêmea']} onPress={(gender) => setGender(gender)} />
                </View>
                <View style={styles.RadioGroup}>
                    <Text style={styles.subTitle}>PORTE</Text>
                    <RadioButton value={size} options={['Pequeno', 'Médio', 'Grande']} onPress={(size) => setSize(size)} />
                </View>
                <View style={styles.RadioGroup}>
                    <Text style={styles.subTitle}>IDADE</Text>
                    <RadioButton value={age} options={['Filhote', 'Adulto', 'Idoso']} onPress={(age) => setAge(age)} />
                </View>
            </>
            <>
                <Text style={styles.subTitle}>TEMPERAMENTO</Text>
                <View style={styles.checkGroup}>
                    <Checkbox text={'Brincalhão'} onPress={() => handleSetTemperament('Brincalhão')}/>
                    <Checkbox text={'Tímido'} onPress={() => handleSetTemperament('Tímido')}/>
                    <Checkbox text={'Calmo'} onPress={() => handleSetTemperament('Calmo')}/>
                </View>
                <View style={styles.checkGroup}>
                    <Checkbox text={'Guarda'} onPress={() => handleSetTemperament('Guarda')}/>
                    <Checkbox text={'Amoroso'} onPress={() => handleSetTemperament('Amoroso')}/>
                    <Checkbox text={'Preguiçoso'} onPress={() => handleSetTemperament('Preguiçoso')}/>
                </View>
            </>
        </>  
    )
}

const UpperButtons = ({ onChangePage, toggleHelp }) => {
    const [activePage, setActivePage] = useState("Adoção")
    const [helpIsActive, setHelpIsActive] = useState(false)
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            gap:8,
            borderColor: '#e6e7e8',
		    borderBottomWidth: 0.8, 
            paddingBottom: 16,
        }}>
            <Button
                onPress={() => {
                    onChangePage("Adoção")
                    setActivePage("Adoção")
                }}
                title="Adoção"
                color={activePage === "Adoção" ? "#ffd358": "#bdbdbd"}
            />
            <Button
                onPress={() => {
                    onChangePage("Apadrinhar")
                    setActivePage("Apadrinhar")
                }}
                title="Apadrinhar"
                color={activePage === "Apadrinhar" ? "#ffd358": "#bdbdbd"}
            />
            <Button
                onPress={() => {
                    toggleHelp(!helpIsActive)
                    setHelpIsActive(!helpIsActive)
                }}
                title="Ajuda"
                color={helpIsActive === true ? "#ffd358": "#bdbdbd"}
            />
        </View>
    )
}

const HelpSection = ({ onChangeData }) => {
    const [petNeeds, setPetNeeds] = useState([])
    const [medicine, setMedicine] = useState([])
    const [objets, setObjects] = useState([])


    useEffect(() => {
        onChangeData({
            petNeeds,
            medicine,
            objets,
        })
    }, [petNeeds, medicine, objets])


    
    const handleSetNeeds = (selectedNeed) => {
        if (petNeeds.includes(selectedNeed)) {
            setPetNeeds(petNeeds.filter(item => item !== selectedNeed))
        } else {
            setPetNeeds([...petNeeds, selectedNeed])
        } 
    }

    return (
        <>
            <Text style={styles.subTitle}>NECESSIDADES DO ANIMAL</Text>
            <View style={styles.checkGroupVertical}>
                <Checkbox text={'Alimento'} onPress={() => handleSetNeeds('Alimento')}/>
                <Checkbox text={'Auxílio financeiro'} onPress={() => handleSetNeeds('Auxílio financeiro')}/>
                <Checkbox text={'Medicamento'} onPress={() => handleSetNeeds('Medicamento')}/>
                <GenericInput
                    placeholder={'Nome do medicamento'}
                    onChangeText={(text) => setMedicine(text)}
				/>
                <Checkbox text={'Objetos'} onPress={() => handleSetNeeds('Objetos')}/>
                <GenericInput
                    placeholder={'Especifique o(s) objeto(s)'}
                    onChangeText={(text) => setObjects(text)}
				/>
            </View>
        </>
    )
}

const PhotoComponent = () => {
    return (
        <View>
            <Text style={styles.subTitle}>FOTOS DO ANIMAL</Text>
            <View style={{
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
            }}>
                <AntDesign name="pluscircleo" size={24} color="#757575" />
                <Text style={
                    { fontFamily: 'Roboto', color: '#757575', fontSize: 14 }
                }>adicionar fotos</Text>
            </View>
        </View>
    )
}

const Adoption = ({ onChangeData }) => {
    const [adoptionRequirements, setAdoptionRequirements] = useState([])

    useEffect(() => {
        onChangeData({
            adoptionRequirements,
        })
    }, [adoptionRequirements])

    const handleRequirements = (selectedRequirement) => {
        if (adoptionRequirements.includes(selectedRequirement)) {
            setAdoptionRequirements(adoptionRequirements.filter(item => item !== selectedRequirement))
        } else {
            setAdoptionRequirements([...adoptionRequirements, selectedRequirement])
        } 
    }


    return (
        <>
            <Text style={styles.subTitle}>EXIGÊNCIAS PARA ADOÇÃO</Text>
            <View style={styles.checkGroupVertical}>
                <Checkbox text={'Termo de adoção'} onPress={() => handleRequirements('Termo de adoção')}/>
                <Checkbox text={'Fotos da casa'} onPress={() => handleRequirements('Fotos da casa')}/>
                <Checkbox text={'Visita prévia do animal'} onPress={() => handleRequirements('Visita prévia do animal')}/>
                <Checkbox text={'Acompanhamento pós adoção'} onPress={() => handleRequirements('Acompanhamento pós adoção')}/>
            </View>
        </>
    )
}

const Sponsor = ({ onChangeData }) => {
    const [sponsorRequirements, setSponsorRequirements] = useState([])

    useEffect(() => {
        onChangeData({
            sponsorRequirements,
        })
    }, [sponsorRequirements])

    const handleRequirements = (selectedRequirement) => {
        if (sponsorRequirements.includes(selectedRequirement)) {
            setSponsorRequirements(sponsorRequirements.filter(item => item !== selectedRequirement))
        } else {
            setSponsorRequirements([...sponsorRequirements, selectedRequirement])
        } 
    }


    return (
        <>
            <Text style={styles.subTitle}>EXIGÊNCIAS PARA APANDRINHAMENTO</Text>
            <View style={styles.checkGroupVertical}>
                <Checkbox text={'Termo de apadrinhamento'} onPress={() => handleRequirements('Termo de apadrinhamento')}/>
                <Checkbox text={'Auxílio finananceiro'} onPress={() => handleRequirements('Auxílio finananceiro')}/>
                <Checkbox text={'Visitas ao animal'} onPress={() => handleRequirements('Visitas ao animal')}/>
            </View>
        </>
    )
}

const PetRegistration = () => {
    const [petName, setPetName] = useState('')
    const [petStory, setPetStory] = useState('')
    const [currentPage, setCurrentPage] = useState('Adoção')
    const [helpIsActive, setHelpIsActive] = useState(false)
    const [helpSectionData, setHelpSectionData] = useState({})
    const [adoptionData, setAdoption] = useState({})
    const [sponsorData, setSponsorData] = useState({})
    const [commonData, setCommonData] = useState({})

    const handleSendData = () => {
        const data = {
            petName,
            petStory,
            helpSectionData,
            adoptionData,
            sponsorData,
            commonData,
        }
        console.log(data)
    }

    const handlePageChange = (page) => {
        setAdoption({})
        setSponsorData({})
        setCurrentPage(page)
    }

    const toggleHelp = (value) => {
        setHelpSectionData({})
        setHelpIsActive(value)
    }


	return (
		<>
			<TopSideMenu
				title='Cadastro do Animal'
				icon='arrow-back-outline'
				style={{ backgroundColor: '#ffd358' }}
			/>
			<ScrollView style={{ flex: 1 }}>
				<View style={styles.container}>
					<Text style={styles.upperText}>Tenho interesse em cadastrar o animal para:</Text>
                    <UpperButtons onChangePage={(page) => handlePageChange(page)} toggleHelp={toggleHelp} />
					<View style={styles.section}>
						<Text style={styles.title}>{currentPage}</Text>
						<GenericInput
                            style={{ marginBottom: 20 }}
							placeholder={'Nome do Animal'}
							label={'Nome do Animal'}
							labelStyle={{ color: '#f7a800' }}
                            onChangeText={(text) => setPetName(text)}
						/>
					</View>
                    <PhotoComponent />
                    <CommonComponents onChangeData={(newData) => setCommonData(newData)} />
                    {currentPage === 'Adoção' ? 
                        <Adoption onChangeData={(newData) => setAdoption(newData)} /> 
                        : <Sponsor onChangeData={(newData) => setSponsorData(newData)} />}
                   {helpIsActive ? <HelpSection onChangeData={(newData) => setHelpSectionData(newData)} />: null}
                    <View style={styles.section}>
						<GenericInput
                            style={{ marginBottom: 20 }}
							placeholder={'Compartile a história do Animal'}
							label={'Sobre o animal'}
							labelStyle={{ color: '#f7a800' }}
                            onChangeText={(text) => setPetStory(text)}
						/>
					</View>
                    <View style={styles.buttonCenter}>
                        <MainButton
                            text={currentPage === 'Apadrinhar' ? 'Procurar Padrinho': 'Colocar para Adoção'}
                            styleButton={{ backgroundColor: '#ffd358', marginTop: 4  }}
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
    upperText:  {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#757575',
        marginTop: 16,
        marginBottom: 16,
    },
	section: {
	},
    subTitle:  {
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
    RadioGroup: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    buttonCenter: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    }
})

export default PetRegistration