import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type Props = {
	text: string,
	styleButton?: any,
	styleText?: any,
	iconComponent?: any,
	onPress?: any 
}

const MainButton: React.FC<Props> = ({
    text,
    styleButton,
    styleText,
    iconComponent,
    onPress
}) => {

	return (
		<TouchableOpacity style={[styles.button, styleButton]} onPress={onPress}>
			{iconComponent && <View style={styles.iconContainer}>{iconComponent}</View>}
			<Text style={[styles.buttonText, styleText]}>{text.toUpperCase()}</Text>
		</TouchableOpacity>
	)
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
		shadowColor: '#000',
		elevation: 5,
		gap: 8,
	},
	buttonText: {
		color: '#434343', // Default text color
		fontSize: 12,
	},
	iconContainer: {},
})

export default MainButton
