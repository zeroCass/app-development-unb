import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
	label: string
	style?: object
	children?: React.ReactNode
	icon?: React.ReactNode
}

const Item = (props: Props) => {
	const [showContent, setShowContent] = useState(false)
	return (
		<>
			<View style={[styles.container, props.style]}>
				<View style={styles.labelContent}>
					{props.icon}
					<Text style={styles.text}>{props.label}</Text>
				</View>
				<TouchableOpacity onPress={() => setShowContent(!showContent)}>
					<MaterialIcons name='expand-more' size={24} color='black' />
				</TouchableOpacity>
			</View>
			{showContent && props.children}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: 48,
		backgroundColor: '#fff',
		paddingHorizontal: 16,
	},
	text: {
		color: '#434343',
		fontSize: 14,
		fontWeight: 'bold',
	},
	labelContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
})

export default Item
