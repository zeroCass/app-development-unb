import { addDoc, collection } from "firebase/firestore";
import { db, storage } from '../../../services/firebase';
import { IRegisterPet } from '../interfaces'
import { ref, uploadBytes } from "firebase/storage";

async function uploadPetImage(imageUri: string, petUid: string, storageFileName: string) {
	const img = await fetch(imageUri);
	const blob = await img.blob();
	const petRef = ref(storage, `pet/${petUid}/${storageFileName}.png`);
	try {
		await uploadBytes(petRef, blob);
	} catch (error) {
		console.warn(error)
	}
}

export const registerPet:any = async (petData: IRegisterPet, imageUri: string) => {
	try {
		const pet = await addDoc(collection(db, "pet"), petData);
		await uploadPetImage(imageUri, pet.id, petData.photos[0]);
		return { type: "success" }
	} catch (erro) {
		return { type: "error", error: String(erro) }
	}
}