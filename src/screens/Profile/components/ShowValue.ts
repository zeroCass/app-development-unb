import { View, Text, Button, StyleSheet, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

const ShowValue = ({ title, value }) => {
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.componente}>
					<Text style={styles.nomeComponente}>{title}</Text>
				</Text>
				<Text style={styles.componente}>
					<Text style={styles.variavel}>{value}</Text>
				</Text>
			</View>
		</>
	)
}

ShowValue.propTypes = {
	title: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	nomeComponente: {
		fontSize: 12,
		fontFamily: 'Roboto',
		color: '#589b9b',
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	variavel: {
		fontSize: 14,
		fontFamily: 'Roboto',
		color: '#757575',
		textAlign: 'center',
	},
})

export default ShowValue
