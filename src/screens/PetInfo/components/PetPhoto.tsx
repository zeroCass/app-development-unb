import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import { fetchedImageUrl } from '../../../services/images'

type Props = {
	petId: string | undefined
}

const PetPhoto = ({ petId }: Props) => {
	const defaultImage = require('../../../assets/images/default-pf.png')
	const [loading, setLoading] = useState(false)
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		if (!petId) return setLoading(true)
		fetchedImageUrl({
			storageUrl: `pet/${petId}/image_0.png`,
			setLoading: (state: boolean) => setLoading(state),
			setUrl: (url: string) => setUrl(url),
		})
	}, [petId])

	return (
		<View style={styles.container}>
			{loading ? (
				<View>
					<ActivityIndicator />
				</View>
			) : (
				<View style={{ flex: 1 }}>
					{url === '' ? (
						<Image style={styles.image} source={defaultImage} />
					) : (
						<Image style={styles.image} source={{ uri: url }} />
					)}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
	},
	loadingContainer: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
})

export default PetPhoto
