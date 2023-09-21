import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const MainButton = ({ text, style }) => {
	// eslint-disable-next-line no-console
	console.log(text)
	return (
		<TouchableOpacity style={[styles.button, style]}>
			<Text style={styles.buttonText}>{text.toUpperCase()}</Text>
		</TouchableOpacity>
	)
}

MainButton.propTypes = {
	text: PropTypes.string.isRequired,
	style: PropTypes.object,
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#88C9BF', // Default button color
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		width: 232,
		height: 40,
    shadowColor: "#000",
		elevation: 5,
	},
	buttonText: {
		color: '#434343', // Default text color
		fontSize: 12,
	},

})

export default MainButton