import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

const MainButton = ({ text, styleButton, styleText, iconComponent }) => {
	return (
		<TouchableOpacity style={[styles.button, styleButton]}>
			{iconComponent && <View style={styles.iconContainer}>{iconComponent}</View>}
			<Text style={[styles.buttonText, styleText]}>{text.toUpperCase()}</Text>
		</TouchableOpacity>
	)
}

MainButton.propTypes = {
	text: PropTypes.string.isRequired,
	styleButton: PropTypes.object,
	styleText: PropTypes.object,
	iconComponent: PropTypes.element,
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#88C9BF', // Default button color
		padding: 10,
		borderRadius: 5,
		justifyContent: 'center',
		flexDirection: 'row',
		width: 232,
		height: 40,
    shadowColor: "#000",
		elevation: 5,
		gap: 8
	},
	buttonText: {
		color: '#434343', // Default text color
		fontSize: 12,
	},
	iconContainer: {},
})

export default MainButton