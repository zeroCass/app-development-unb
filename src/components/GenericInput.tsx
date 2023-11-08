import React from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'

export type Props = {
	label?: string
	labelStyle?: any
	placeholder: string
	textContentType?: any
	placeholderTextColor?: string
	style?: any
	onChangeText: (text: string) => void
	value: string
}

const GenericInput = ({
	label,
	labelStyle,
	placeholder,
	textContentType = 'none',
	placeholderTextColor,
	style,
	onChangeText,
	value,
}: Props) => {
	return (
		<>
			{label ? <Text style={[styles.label, labelStyle]}>{label.toUpperCase()}</Text> : null}
			<TextInput
				style={[styles.input, style]}
				textContentType={textContentType}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor || '#bdbdbd'}
				onChangeText={onChangeText}
				value={value}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	label: {
		color: '#000',
		fontFamily: 'Roboto',
		fontSize: 12,
		marginBottom: 10,
	},
	input: {
		width: 312,
		borderColor: '#e6e7e8',
		borderBottomWidth: 0.8,
		fontFamily: 'Roboto',
		fontSize: 14,
		color: '#575756',
	},
})

export default GenericInput
