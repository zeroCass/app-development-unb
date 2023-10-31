import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
	label: string
	style?: object
	underline?: boolean
	onPress: () => void
}

const SubItem = (props: Props) => {
	const hasUnderlineStyle = props.underline !== false ? styles.underline : null
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View style={[styles.container, props.style]}>
				<View style={[styles.labelContent, hasUnderlineStyle]}>
					<Text style={styles.text}>{props.label}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: '20%',
		width: '100%',
		height: 52,
	},
	text: {
		color: '#434343',
		fontSize: 14,
		fontWeight: 'bold',
	},
	labelContent: {
		justifyContent: 'center',
		paddingVertical: 16,
	},
	underline: {
		borderBottomWidth: 1,
		borderBottomColor: '#e6e7e8',
	},
})

export default SubItem
