import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type Props = {
	text: string
	styleButton?: any
	styleText?: any
	iconComponent?: any
	onPress?: any
	disabled?: boolean
}

const MainButton: React.FC<Props> = ({
	text,
	styleButton,
	styleText,
	iconComponent,
	onPress,
	disabled,
}) => {
	const handleOnPress = () => {
		if (!disabled) onPress()
	}

	return (
		<TouchableOpacity
			style={[styles.button, styleButton, disabled && styles.disabledButton]}
			onPress={handleOnPress}
			disabled={disabled}
		>
			{iconComponent && <View style={styles.iconContainer}>{iconComponent}</View>}
			<Text style={[styles.buttonText, styleText, disabled && styles.disabledText]}>
				{text.toUpperCase()}
			</Text>
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
	disabledButton: {
		backgroundColor: '#ccc',
	},
	disabledText: {
		fontStyle: 'italic',
	},
	iconContainer: {},
})

export default MainButton
