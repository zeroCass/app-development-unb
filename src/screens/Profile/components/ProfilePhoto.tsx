import { Image, StyleSheet, View, ActivityIndicator } from 'react-native'

export type Props = {
	url: any
}

const ProfilePhoto = (props: Props) => {
	return (
		<>
			<View style={styles.container}>
				{
				props.url.loading ? 
					<ActivityIndicator size="large" color="#666" /> :
					<Image style={{ width: 150, height: 150, borderRadius: 100 }} source={props.url.source} />
				}
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
