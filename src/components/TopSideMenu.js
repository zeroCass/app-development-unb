import { View, Text, Button, StyleSheet, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

const TopSideMenu = ({ title, icon }) => {
	return (
		<>
			<View style={styles.container}>
				<Ionicons name={icon} size={28} color='#434343' style={styles.icon} />
				<Text style={styles.text}>{title}</Text>
			</View>
		</>
	)
}

TopSideMenu.propTypes = {
	title: PropTypes.string.isRequired,
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
		shadowColor: "#000",
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