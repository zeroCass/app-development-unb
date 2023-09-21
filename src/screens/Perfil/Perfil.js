import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import MainButton from '../../components/MainButton'

const Perfil = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>
				Perfil <Text style={styles.innerText}>Page</Text>!
			</Text>
			<MainButton text={'Perfil'} />
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

export default Perfil
