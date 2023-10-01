import { View, Text, Button, StyleSheet, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

const TopSideMenu = ({ title }) => {
	return (
		<>
			{/* <View styles={styles.statusBar}>
				<StatusBar backgroundColor={'#88c9bf'} barStyle={'light-content'} translucent={false} />
			</View> */}
			<View style={styles.container}>
				<Ionicons name='menu' size={28} color='#434343' style={styles.icon} />
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
