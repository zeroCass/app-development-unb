import { Image, StyleSheet, View, ActivityIndicator } from 'react-native'

export type Props = {
	url: string
}

const ProfilePhoto: React.FC<Props> = (props: Props) => {
	console.log(props.url)

	if (props.url === '') {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#666" />
			</View>
		)
	}

	return (
		<>
			<View style={styles.container}>
				<Image
					style={{ width: 150, height: 150, borderRadius: 100 }}
					source={{uri: props.url}}
				/>
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
})

export default ProfilePhoto
