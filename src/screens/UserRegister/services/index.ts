import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from "firebase/firestore";
import { auth, db } from '../../../services/firebase';
import { IRegisterUser } from "../interfaces";

export const registerUser:any = async (userData: IRegisterUser) => {
	try {
		const authResult = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
		await setDoc(
			doc(db, "users", authResult.user.uid), 
			{
				full_name: userData.fullName,
				username: userData.username,
				email: userData.email,
				age: userData.age,
				phone: userData.phone,
				state: userData.uf,
				city: userData.city,
				address: userData.street,
			}
		)
		return { type: "success" }
	} catch (erro) {
		return { type: "error", error: String(erro) }
	}
}