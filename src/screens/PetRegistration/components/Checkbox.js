import { MaterialCommunityIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Checkbox = ({ text, onPress }) => {
	const [status, setStatus] = useState(false)

	const toggleCheckbox = () => {
		onPress()
		setStatus(!status)
	}

	return (
		<TouchableOpacity onPress={toggleCheckbox}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View>
					{status ? (
						<MaterialCommunityIcons name='checkbox-outline' size={24} color='#757575' />
					) : (
						<MaterialCommunityIcons name='checkbox-blank-outline' size={24} color='#757575' />
					)}
				</View>
				<Text style={{ marginLeft: 8, color: '#757575' }}>{text}</Text>
			</View>
		</TouchableOpacity>
	)
}

Checkbox.propTypes = {
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
	square: {
		width: 24,
		height: 24,
		borderWidth: 2,
		borderColor: 'blue',
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default Checkbox
