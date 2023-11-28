import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'
import { fetchedImagesUrl } from '../../../services/images'

type Props = {
	petId: string | undefined
}

const { width } = Dimensions.get('screen')

const PetPhoto = ({ petId }: Props) => {
	const defaultImage = require('../../../assets/images/default-pf.png')
	const [loading, setLoading] = useState(false)
	const [urls, setUrls] = useState<string[]>([''])

	useEffect(() => {
		if (!petId) return setLoading(true)
		fetchedImagesUrl({
			entityFolder: 'pet',
			entityID: petId,
			setLoading: (state: boolean) => setLoading(state),
			setUrls: (urls: string[]) => setUrls(urls),
		})
		console.log('urls: ', urls)
	}, [petId])

	return (
		<View style={styles.container}>
			{loading ? (
				<View>
					<ActivityIndicator />
				</View>
			) : (
				<View style={{ flex: 1 }}>
					{urls[0] === '' ? (
						<Image style={styles.image} source={defaultImage} />
					) : (
						<Carousel urls={urls} />
					)}
				</View>
			)}
		</View>
	)
}

const Carousel = ({ urls }: { urls: string[] }) => {
	const [index, setIndex] = useState(0)
	const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
		setIndex(viewableItems[0].index)
	}).current

	// const viewabilityConfig = useRef({
	// 	itemVisiblePercenteThreshold: 50,
	// }).current

	return (
		<>
			<FlatList
				data={urls}
				renderItem={({ item }) => <Image style={styles.image} source={{ uri: item }} />}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				snapToAlignment='center'
				onViewableItemsChanged={handleOnViewableItemsChanged}
				// viewabilityConfig={viewabilityConfig}
			/>
			<Pagination data={urls} index={index} />
		</>
	)
}

const Pagination = ({ data, index }: { data: string[]; index: number }) => {
	if (data.length < 2) return
	return (
		<View style={styles.dotContainer}>
			{data.map((_, idx) => (
				<View key={idx.toString()} style={[styles.dot, idx === index && styles.dotActive]} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width,
	},
	loadingContainer: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width,
		height: '100%',
	},
	dotContainer: {
		position: 'absolute',
		bottom: 15,
		flexDirection: 'row',
		gap: 12,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		borderWidth: 2,
		borderColor: '#ccc',
	},
	dotActive: {
		backgroundColor: '#ccc',
	},
})

export default PetPhoto
