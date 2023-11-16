import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../../services/firebase'
import { IRegisterPet } from '../interfaces'

type returnType = {
	type: 'success' | 'error'
	error?: string
}

type ImagesType = {
	id: number
	imageUri: string
}

async function uploadPetImage(images: ImagesType[], petUid: string) {
	for (let index = 0; index < images.length; index++) {
		const imageUri = images[index]?.imageUri
		if (imageUri) {
			const img = await fetch(imageUri)
			const blob = await img.blob()
			const petRef = ref(storage, `pet/${petUid}/image_${index}.png`)
			try {
				await uploadBytes(petRef, blob)
			} catch (error) {
				console.warn(error)
			}
		}
	}
}

export const registerPet = async (
	petData: IRegisterPet,
	images: ImagesType[]
): Promise<returnType> => {
	try {
		const pet = await addDoc(collection(db, 'pet'), petData)
		await uploadPetImage(images, pet.id)
		return { type: 'success' }
	} catch (erro) {
		return { type: 'error', error: String(erro) }
	}
}
