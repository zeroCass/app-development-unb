import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native'
import { TUser } from '../../../context/Auth'
import ShowValue from '../../../screens/Profile/components/ShowValue'
import { defaultUserImage, fetchedImageUrl } from '../../../services/images'

const UserRequester = ({ senderUser }: { senderUser: TUser }) => {
	const [url, setUrl] = useState<string>('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchedImageUrl({
			storageUrl: `user/${senderUser.user_uid}/profilePicture.png`,
			setLoading: (state: boolean) => setLoading(state),
			setUrl: (url: string) => setUrl(url),
		})
	}, [])

	return (
		<ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={true}>
			<View style={styles.container}>
				<View style={styles.userPhotoContainer}>
					{loading && <ActivityIndicator />}
					{url === '' ? (
						<Image style={styles.image} source={defaultUserImage} />
					) : (
						<Image style={styles.image} source={{ uri: url }} />
					)}
				</View>
				<ShowValue title='NOME COMPLETO' value={senderUser.full_name} />
				<ShowValue title='EMAIL' value={senderUser.email} />
				<ShowValue title='TELEFONE' value={senderUser.phone} />
				<ShowValue title='LOCALIZAÇÃO' value={senderUser.state + ', ' + senderUser.city} />
				<ShowValue title='ENDEREÇO' value={senderUser.address} />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		flex: 1,
		width: '100%',
	},
	image: {
		flex: 1,
		width: 150,
		height: 150,
		borderRadius: 75,
		resizeMode: 'cover',
	},
	userPhotoContainer: {
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 150,
	},
})

export default UserRequester
