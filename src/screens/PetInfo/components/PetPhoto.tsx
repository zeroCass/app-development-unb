import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import { storage } from '../../../services/firebase'

type Props = {
	petId: string | undefined
}

const PetPhoto = ({ petId }: Props) => {
	const defaultImage = require('../../../assets/images/default-pf.png')
	const [loading, setLoading] = useState(false)
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		if (!petId) return setLoading(true)
		fetchImage()
	}, [petId])

	const fetchImage = async () => {
		setLoading(true)
		try {
			const url = await getDownloadURL(ref(storage, `pet/${petId}/profilePicture.png`))
			setUrl(url)
		} catch (error) {
			console.log('petPhoto error: ', error)
			setUrl('')
		} finally {
			setLoading(false)
		}
	}

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
