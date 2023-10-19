import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, addDoc, collection } from "firebase/firestore";
import { auth, db } from '../../../services/firebase';
import { IRegisterUser } from "../interfaces";

export const registerUser:any = async (userData: IRegisterUser) => {
	try {
		const authResult = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
		const dbCollection = collection(db, "users");
		await addDoc(
			collection(db, "users"), 
			{
				age: userData.age,
				city: userData.city,
				email: userData.email,
				full_name: userData.fullName,
				phone: userData.phone,
				state: userData.uf,
				username: userData.username,
				auth_id: authResult.user.uid
			}
		)
		return { type: "success" }
	} catch (erro) {
		return { type: "error", error: String(erro) }
	}
}