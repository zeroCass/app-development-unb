import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
	text: string
	onCheck: (checkd: boolean) => void
	checked: boolean
	disabled?: boolean
}

const Checkbox = ({ text, onCheck, checked, disabled = false }: Props) => {
	return (
		<TouchableOpacity
			onPress={() => {
				onCheck(!checked)
			}}
			disabled={disabled}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View>
					{checked ? (
						<MaterialCommunityIcons
							name='checkbox-outline'
							size={styles.icon.fontSize}
							color={!disabled ? styles.icon.color : styles.disabled.color}
						/>
					) : (
						<MaterialCommunityIcons
							name='checkbox-blank-outline'
							size={styles.icon.fontSize}
							color={!disabled ? styles.icon.color : styles.disabled.color}
						/>
					)}
				</View>
				<Text style={[styles.text, disabled ? styles.disabled : {}]}>{text}</Text>
			</View>
		</TouchableOpacity>
	)
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

export default Checkbox
