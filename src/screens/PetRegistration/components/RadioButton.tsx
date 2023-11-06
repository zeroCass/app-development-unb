import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type RadioButtonProps = {
	options: string[]
	onPress: (text: string) => void
	value: string
	style?: any
}

const RadioButton = ({ options, onPress, value, style }: RadioButtonProps) => {
	return (
		<View style={[styles.container, style]}>
			{options.map((option: string) => (
				<TouchableOpacity key={option} onPress={() => onPress(option)}>
					<View style={{ flexDirection: 'row' }}>
						<View>
							{value === option ? (
								<MaterialIcons
									name='radio-button-on'
									size={styles.icon.fontSize}
									color={styles.icon.color}
								/>
							) : (
								<MaterialIcons
									name='radio-button-off'
									size={styles.icon.fontSize}
									color={styles.icon.color}
								/>
							)}
						</View>
						<Text style={styles.text}>{option}</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		gap: 16,
	},
	icon: {
		color: '#757575',
		fontSize: 24,
	},
	text: {
		color: '#757575',
		marginLeft: 8,
	},
	disabled: {
		color: '#DDD',
	},
})

export default RadioButton
