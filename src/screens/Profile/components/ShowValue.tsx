import { View, Text, StyleSheet } from 'react-native'

export type ShowValueProps = {
	title: string,
	value?: string
}

const ShowValue: React.FC<ShowValueProps> = ({
    title,
    value
}) => {
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.componente}>
					<Text style={styles.nomeComponente}>{title}</Text>
				</Text>
				<Text style={styles.componente}>
					<Text style={styles.variavel}>{value}</Text>
				</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	nomeComponente: {
		fontSize: 12,
		fontFamily: 'Roboto',
		color: '#589b9b',
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	variavel: {
		fontSize: 14,
		fontFamily: 'Roboto',
		color: '#757575',
		textAlign: 'center',
	},
})

export default ShowValue
