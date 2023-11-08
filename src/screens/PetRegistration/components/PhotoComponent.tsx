import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { PhotoComponentProps } from '../interfaces'

const PhotoComponent = ({ onChangeData, imageUri }: PhotoComponentProps) => {
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled && result.assets[0] !== undefined) {
			onChangeData(result.assets[0].uri)
		}
	}

	return (
		<View>
			<Text style={styles.subTitle}>FOTOS DO ANIMAL</Text>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				{imageUri ? (
					<>
						<Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
						<Pressable style={styles.imageButton2} onPress={pickImage}>
							<Ionicons name='add-circle-outline' size={24} color='#757575' style={styles.icon} />
							<Text style={styles.imageUploadText}>{'Adicionar foto'}</Text>
						</Pressable>
					</>
				) : (
					<Pressable style={styles.imageButton} onPress={pickImage}>
						<Ionicons name='add-circle-outline' size={24} color='#757575' style={styles.icon} />
						<Text style={styles.imageUploadText}>{'Adicionar foto'}</Text>
					</Pressable>
				)}
			</View>
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
		width: 128,
		height: 128,
		backgroundColor: '#e6e7e7',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		elevation: 5,
		gap: 8,
	},
	imageButton2: {
		width: 128,
		height: 64,
		backgroundColor: '#e6e7e7',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		elevation: 5,
		gap: 8,
		marginTop: 16,
	},
	imageUploadText: {
		color: '#757575',
		fontSize: 14,
		borderRadius: 2,
		marginBottom: 48,
	},
	icon: {
		position: 'absolute',
		top: 0,
		right: 24,
		marginTop: 44,
		marginLeft: 16,
		marginRight: 16,
		alignSelf: 'center',
	},
})

export default PhotoComponent
