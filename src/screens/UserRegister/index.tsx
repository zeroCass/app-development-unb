import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
	View,
	StyleSheet,
	Text,
	TextInput,
	ScrollView,
	Image,
	Pressable
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import MainButton from '../../components/MainButton'
import TopSideMenu from '../../components/TopSideMenu'
import { registerUser } from './services'

const UserRegister = ({navigation}: any) => {
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
	const [image, setImage] = useState('')

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled && result.assets[0] !== undefined) {
			setImage(result.assets[0].uri)
		}
	}

	const register = () => {
		if (password !== passwordConfirmation) {
			console.warn("Senhas não batem")
			return
		} else {
			const result = registerUser({
				fullName,
				username,
				email,
				password,
				age,
				phone,
				city,
				uf
			});
			if (result.type == "error") {
				const errorCode = result.error.code;
				const errorMessage = result.error.message;
				console.warn(errorMessage);
			} else {
				navigation.navigate('Home', {})
			};
		}
	}
	return (
		<>
			<TopSideMenu title='Cadastro Pessoal' icon='reorder-three-outline' />
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.disclaimer}>
						As Informações preenchidas serão divulgadas apenas para a pessoa com a qual você
						realizar o processo de adoção e/ou apadrinhamento, após a formalização do processo.
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
							keyboardType='numeric'
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
							keyboardType='numeric'
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

						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							{/* <Pressable style={styles.imageButton} onPress={pickImage}>
								<Ionicons name='add-circle-outline' size={24} color='#757575' style={styles.icon} />
								<Text style={styles.imageUploadText}>{"Adicionar foto"}</Text>
							</Pressable>
							{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}

							{image ? (
								<>
									<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
									<Pressable style={styles.imageButton2} onPress={pickImage}>
										<Ionicons
											name='add-circle-outline'
											size={24}
											color='#757575'
											style={styles.icon}
										/>
										<Text style={styles.imageUploadText}>{'Adicionar foto'}</Text>
									</Pressable>
								</>
							) : (
								<Pressable style={styles.imageButton} onPress={pickImage}>
									<Ionicons
										name='add-circle-outline'
										size={24}
										color='#757575'
										style={styles.icon}
									/>
									<Text style={styles.imageUploadText}>{'Adicionar foto'}</Text>
								</Pressable>
							)}
						</View>
					</View>

					<View style={styles.buttonContainer}>
						<MainButton text={'Fazer Cadastro'} onPress={register}/>
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
		// alignItems: "left",
		gap: 8,
		marginLeft: 16,
		marginRight: 16,
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
		color: '#575756',
	},
	icon: {
		position: 'absolute',
		top: 0,
		right: 24,
		marginTop: 44,
		marginLeft: 16,
		marginRight: 16,
		alignSelf: 'center',
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
		marginBottom: 32,
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
		marginRight: 16,
	},
	imageButton: {
		width: 128,
		height: 128,
		backgroundColor: '#e6e7e7',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		elevation: 5,
		gap: 8,
	},
	imageButton2: {
		width: 128,
		height: 64,
		backgroundColor: '#e6e7e7',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		elevation: 5,
		gap: 8,
		marginTop: 16,
	},
	imageUploadText: {
		color: '#757575',
		fontSize: 14,
		borderRadius: 2,
		marginBottom: 48,
	},
})

export default UserRegister
