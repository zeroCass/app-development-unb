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
								<MaterialIcons name='radio-button-on' size={24} color='#757575' />
							) : (
								<MaterialIcons name='radio-button-off' size={24} color='#757575' />
							)}
						</View>
						<Text style={{ marginLeft: 8, color: '#757575' }}>{option}</Text>
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
})

export default RadioButton
