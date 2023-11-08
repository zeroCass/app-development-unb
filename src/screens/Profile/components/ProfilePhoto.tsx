import { Image, StyleSheet, View } from 'react-native'

export type Props = {
	url: string
}

const getImageSource = (url: string) => {
	if (url === '') return require('../../../assets/images/default-pf.png')
	if (url !== '') return url
}

const ProfilePhoto = (props: Props) => {
	const imageSource = getImageSource(props.url)

	return (
		<>
			<View style={styles.container}>
				<Image style={{ width: 150, height: 150, borderRadius: 100 }} source={imageSource} />
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
