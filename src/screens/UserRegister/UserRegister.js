import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native'
import MainButton from '../../components/MainButton'
import TopSideMenu from '../../components/TopSideMenu'
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const UserRegister = () => {

    const [fullName, setFullName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

	return (
		<>
			<TopSideMenu title='Cadastro Pessoal' icon='reorder-three-outline' />
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.disclaimer}>
						As Informações preenchidas serão divulgadas apenas para a pessoa com a qual você realizar o processo de adoção e/ou apadrinhamento, após a formalização do processo.
					</Text>

					<View style={styles.inputContainer}>

						<Text style={styles.sectionTitle}>INFORMAÇÕES PESSOAIS</Text>

						<TextInput
							style={styles.input}
							onChangeText={setFullName}
							value={fullName}
							placeholder='Nome completo'
							placeholderTextColor={'#bdbdbd'}
						/>
						{fullName ? (
							<Ionicons name='checkmark' size={24} color='#589b9b' style={styles.icon} />
						) : null}

						<TextInput
							style={styles.input}
							onChangeText={setAge}
							value={age}
							placeholder='Idade'
							placeholderTextColor={'#bdbdbd'}
							keyboardType="numeric"
						/>
						
						<TextInput
							style={styles.input}
							onChangeText={setEmail}
							value={email}
							placeholder='E-mail'
							placeholderTextColor={'#bdbdbd'}
						/>

						<TextInput
							style={styles.input}
							onChangeText={setUf}
							value={uf}
							placeholder='Estado'
							placeholderTextColor={'#bdbdbd'}
						/>

						<TextInput
							style={styles.input}
							onChangeText={setCity}
							value={city}
							placeholder='Cidade'
							placeholderTextColor={'#bdbdbd'}
						/>

						<TextInput
							style={styles.input}
							onChangeText={setStreet}
							value={street}
							placeholder='Endereço'
							placeholderTextColor={'#bdbdbd'}
						/>

						<TextInput
							style={styles.input}
							onChangeText={setPhone}
							value={phone}
							placeholder='Telefone'
							placeholderTextColor={'#bdbdbd'}
							keyboardType="numeric"
						/>

						<Text style={styles.sectionTitle}>INFORMAÇÕES DE PERFIL</Text>

						<TextInput
							style={styles.input}
							onChangeText={setUsername}
							value={username}
							placeholder='Usuário'
							placeholderTextColor={'#bdbdbd'}
						/>

						<TextInput
							style={styles.input}
							onChangeText={setPassword}
							value={password}
							placeholder='Senha'
							placeholderTextColor={'#bdbdbd'}
						/>

						<TextInput
							style={styles.input}
							onChangeText={setPasswordConfirmation}
							value={passwordConfirmation}
							placeholder='Confirmação de senha'
							placeholderTextColor={'#bdbdbd'}
						/>
						<Text style={styles.sectionTitle}>FOTO DE PERFIL</Text>
					</View>

					<View style={styles.buttonContainer}>
						<MainButton text={'Fazer Cadastro'} />
					</View>
					<StatusBar style='auto' />
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#fafafa',
	},
	inputContainer: {
		alignItems: 'left',
		gap: 8,
        marginLeft: 16,
        marginRight: 16
	},
	buttonContainer: {
		marginTop: 52,
		marginBottom: 24,
		alignItems: 'center',
	},
	aditionalButtonContainer: {
		marginTop: 72,
		alignItems: 'center',
		gap: 8,
	},
	input: {
		width: 312,
		borderColor: '#e6e7e8',
		borderBottomWidth: 0.8,
		fontFamily: 'Roboto',
		fontSize: 14,
		color: '#575756'
	},
	icon: {
		position: 'absolute',
		top: 0,
		right: 24,
	},
	titleText: {
		fontSize: 20,
	},
	innerText: {
		fontWeight: 'bold',
	},
	baseText: {
		fontSize: 16,
	},
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#589b9b',
		marginTop: 28,
		marginBottom: 32
    },
	disclaimer: {
		fontSize: 14,
		fontFamily: 'Roboto',
		color: '#434343',
		backgroundColor: '#cfe9e5',
		borderRadius: 4,
		width: 328,
		height: 80,
		textAlign: 'center',
		marginTop: 16,
		marginLeft: 16,
		marginRight: 16
	}
})

export default UserRegister
