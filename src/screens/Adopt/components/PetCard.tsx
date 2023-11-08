import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { storage } from '../../../services/firebase'

type Props = {
	petId: string | undefined
	name: string | undefined
	sex: string | undefined
	age_range: string | undefined
	size: string | undefined
}

const PetCard = ({ petId, sex, age_range, size, name }: Props) => {
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

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{name}</Text>
			</View>
			<View style={styles.imgContainer}>
				{url === '' ? (
					<Image style={styles.image} source={defaultImage} />
				) : (
					<Image style={styles.image} source={{ uri: url }} />
				)}
			</View>
			<View style={styles.footer}>
				<View style={styles.petInfo}>
					<Text style={styles.text}>{sex?.toUpperCase()}</Text>
					<Text style={styles.text}>{age_range?.toUpperCase()}</Text>
					<Text style={styles.text}>{size?.toUpperCase()}</Text>
				</View>
				<View style={styles.location}>
					<Text style={styles.text}>LOCALIDADE</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	loadingContainer: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		backgroundColor: '#fff',
		height: 344,
		width: '100%',
		marginBottom: 16,
		borderRadius: 10,
		overflow: 'hidden',
		shadowColor: '#000000',
		shadowOpacity: 5,
		shadowRadius: 10,
		elevation: 3,
	},
	header: {
		flex: 1,
		paddingLeft: 16,
		justifyContent: 'center',
		width: '100%',
		backgroundColor: '#fee29b',
		// borderTopRightRadius: 10,
		// borderTopLeftRadius: 10,
	},
	imgContainer: {
		height: '70%',
		width: '100%',
		overflow: 'hidden',
	},
	image: {
		flex: 1,
		width: '100%',
		resizeMode: 'cover',
	},
	footer: {
		height: '20%',
		width: '100%',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#434343',
	},
	text: {
		fontSize: 12,
		color: '#434343',
	},
	petInfo: {
		padding: 5,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	location: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default PetCard
