import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>
				Hello <Text style={styles.innerText}>World</Text>!
			</Text>
			<Text style={styles.titleText}>
				Hello <Text style={styles.innerText}>World 2</Text>!
			</Text>
			<Text style={styles.baseText}>Some other text</Text>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleText: {
		fontSize: 20,
	},
	innerText: {
		fontWeight: 'bold',
	},
	baseText: {
		fontSize: 16,
	},
})
