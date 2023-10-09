import { Entypo, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useContext, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import MainButton from '../../components/MainButton'
import { AuthContext } from '../../context/Auth'

const Login = () => {
	const { signin: authSignin } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [isEmailValid, setIsEmailValid] = useState(false)
	const [isPasswordValid, setIsPasswordValid] = useState(false)
	const [password, setPassword] = useState('')

	const validateEmail = (textEmail) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]+$/
		setIsEmailValid(emailPattern.test(textEmail))
		setEmail(textEmail)
	}

	const validatePassword = (textPassword) => {
		textPassword.length >= 6 ? setIsPasswordValid(true) : setIsPasswordValid(false)
		setPassword(textPassword)
	}

	const sigin = () => {
		authSignin()
	}

	return (
		<>
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='Nome de usuário'
						textContentType='username'
						placeholderTextColor={'#bdbdbd'}
						onChangeText={validateEmail}
						value={email}
					/>
					{isEmailValid ? (
						<Ionicons name='checkmark' size={24} color='#589b9b' style={styles.icon} />
					) : null}
					<TextInput
						style={[
							styles.input,
							isPasswordValid
								? { borderColor: '#88c9bf', borderBottomWidth: 2 }
								: { borderColor: '#e6e7e8', borderBottomWidth: 0.8 },
						]}
						placeholder='Senha'
						textContentType='password'
						secureTextEntry={true}
						placeholderTextColor={'#bdbdbd'}
						onChangeText={validatePassword}
						value={password}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<MainButton text={'Entrar'} onPress={sigin} />
				</View>
				<View style={styles.aditionalButtonContainer}>
					<MainButton
						text={'Entrar com Facebook'}
						styleButton={{ backgroundColor: '#194f7c' }}
						styleText={{ color: '#fff' }}
						iconComponent={<Ionicons name='logo-facebook' size={20} color='#fff' />}
					/>
					<MainButton
						text={'Entrar com Google'}
						styleButton={{ backgroundColor: '#f15f5c' }}
						styleText={{ color: '#fff' }}
						iconComponent={<Entypo name='google-' size={20} color='#fff' />}
					/>
				</View>
				<StatusBar style='auto' />
			</View>
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
		alignItems: 'center',
		marginTop: 64,
		gap: 8,
	},
	buttonContainer: {
		marginTop: 52,
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
})

export default Login
