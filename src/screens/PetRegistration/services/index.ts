import { addDoc, collection } from "firebase/firestore";
import { db } from '../../../services/firebase';
import { IRegisterPet } from '../interfaces'

export const registerPet:any = async (petData: IRegisterPet) => {
	try {
		await addDoc(collection(db, "pet"), petData);
		return { type: "success" }
	} catch (erro) {
		return { type: "error", error: String(erro) }
	}
}