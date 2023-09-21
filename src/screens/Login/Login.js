import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import MainButton from '../../components/MainButton'

const Login = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>
				Login <Text style={styles.innerText}>Page</Text>!
			</Text>
			<MainButton text={'Login'} />
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
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
