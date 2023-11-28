import { FontAwesome, Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'

type ImagesType = {
	id: number
	imageUri: string
}

type PhotoComponentProps = {
	onAddImage: (images: ImagesType[]) => void
	onRemoveImage: (images: ImagesType[]) => void
	images: ImagesType[]
}

const PhotoComponent = ({ onAddImage, onRemoveImage, images }: PhotoComponentProps) => {
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: true,
		})

		if (!result.canceled) {
			const imagesLen = images.length
			const incomingImages: ImagesType[] = []
			result.assets.forEach((image: ImagePicker.ImagePickerAsset, index: number) =>
				incomingImages.push({ id: index + imagesLen, imageUri: image.uri })
			)
			onAddImage(incomingImages)
		}
	}

	const removeImage = (imageId: number) => {
		const newImages = images
			.filter((image) => image.id !== imageId)
			.map((image, index) => ({ ...image, id: index }))
		onRemoveImage(newImages)
	}

	return (
		<View style={{ flex: 1 }}>
			<Text style={styles.subTitle}>FOTOS DO ANIMAL</Text>
			{images.length > 0 && <Carrosel onRemove={removeImage} images={images} />}
			<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 24 }}>
				<Pressable style={styles.imageButton} onPress={pickImage}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Ionicons name='add-circle-outline' size={24} color='#757575' />
						<Text style={styles.imageUploadText}>{'Adicionar foto'}</Text>
					</View>
				</Pressable>
			</View>
		</View>
	)
}

const Carrosel = ({
	images,
	onRemove,
}: {
	images: ImagesType[]
	onRemove: (imageId: number) => void
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	// const viewableItemsChanted = useRef(({ viewableItems }: any) => {
	// 	setCurrentIndex(viewableItems[0].id)
	// }).current

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				// contentContainerStyle={{ flex: 1 }}
				data={images}
				renderItem={({ item }) => <CarroselItem onRemove={onRemove} image={item} />}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator
				bounces={false}
				keyExtractor={(item) => String(item.id)}
				// onViewableItemsChanged={viewableItemsChanted}
			/>
		</View>
	)
}

const CarroselItem = ({
	image,
	onRemove,
}: {
	image: ImagesType
	onRemove: (imageId: number) => void
}) => {
	return (
		<View
			style={[
				{
					flex: 1,
					width: 300,
					height: 300,
					margin: 8,
					position: 'relative',
				},
			]}
		>
			<ImageBackground style={{ flex: 1, width: '100%' }} source={{ uri: image.imageUri }}>
				<Pressable
					onPress={() => onRemove(image.id)}
					style={{
						width: 34,
						height: 34,
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 50,
						backgroundColor: 'red',
						position: 'absolute',
						top: 10,
						right: 10,
					}}
				>
					<FontAwesome name='remove' size={24} color='white' style={{}} />
				</Pressable>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	subTitle: {
		color: '#f7a800',
		fontFamily: 'Roboto',
		fontSize: 12,
		marginBottom: 16,
	},
	imageButton: {
		width: 220,
		height: 80,
		backgroundColor: '#e6e7e7',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		elevation: 5,
	},
	imageUploadText: {
		color: '#757575',
		fontSize: 14,
	},
	icon: {
		flex: 1,
	},
})

export default PhotoComponent
