import { Ionicons } from '@expo/vector-icons'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

export type Props = {
	title: string,
	icon?: any,
	style?: any,
}

const TopSideMenu: React.FC<Props> = ({
    title,
    icon,
    style = {}
}) => {
	return (
		<>
			<View style={[styles.container, style]}>
				<Ionicons name={icon} size={28} color='#434343' style={styles.icon} />
				<Text style={styles.text}>{title}</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	statusBar: {
		backgroundColor: '#88c9bf',
		height: StatusBar.currentHeight,
		width: '100%',
	},
	container: {
		marginTop: StatusBar.currentHeight,
		width: '100%',
		height: 56,
		flexDirection: 'row',
		backgroundColor: '#cfe9e5',
		gap: 16,
		alignItems: 'center',
		shadowColor: '#000',
		elevation: 5,
	},
	text: {
		fontSize: 20,
		color: '#434343',
	},
	icon: {
		marginLeft: 16,
		marginRight: 16,
		alignSelf: 'center',
	},
})

export default TopSideMenu
