import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
	onPress: () => void
}

const LogoutButton = (props: Props) => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View style={styles.container}>
				<Text style={styles.text}>Sair</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 48,
		backgroundColor: '#88c9bf',
	},
	text: {
		color: '#434343',
		fontSize: 14,
		fontWeight: 'bold',
	},
})

export default LogoutButton
