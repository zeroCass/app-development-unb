import { MaterialIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const RadioButton = ({ options, onPress, value, style }) => {

	const handleChangeValue = (value) => {
        onPress(value)
	}

	return (
        <View style={[styles.container, style]}>
            {options.map(option => (
                <TouchableOpacity key={option} onPress={() => handleChangeValue(option)}>
                    <View style={ {flexDirection: 'row'} }>
                        <View>
                            {value === option ? <MaterialIcons name="radio-button-on" size={24} color="#757575" /> :
                            <MaterialIcons name="radio-button-off" size={24} color="#757575" />  }
                        </View>
                        <Text style={{ marginLeft: 8, color: '#757575' }}>{option}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
	)
}


RadioButton.propTypes = {
    options: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    style: PropTypes.object,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 16,
    }
})

export default RadioButton 