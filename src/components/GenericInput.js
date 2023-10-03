import PropTypes from 'prop-types'
import { useState } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'

const GenericInput = ({
	label,
	labelStyle,
	placeholder,
	textContentType,
	placeholderTextColor,
	style,
    onChangeText,
}) => {
	const [input, onChangeInput] = useState('')
    const handleOnChangeText = (text) => {
        onChangeInput(text)
        onChangeText(text)
    }
	return (
		<>
			{label ? <Text style={[styles.label, labelStyle]}>{label.toUpperCase()}</Text> : null}
			<TextInput
				style={[styles.input, style]}
				textContentType={textContentType ? textContentType : 'none'}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#bdbdbd'}
				onChangeText={(text) => handleOnChangeText(text)}
				value={input}
			/>
		</>
	)
}

GenericInput.propTypes = {
	label: PropTypes.string,
	labelStyle: PropTypes.object,
	placeholder: PropTypes.string.isRequired,
	textContentType: PropTypes.string,
	placeholderTextColor: PropTypes.string,
	style: PropTypes.object,
    onChangeText: PropTypes.func.isRequired,
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
