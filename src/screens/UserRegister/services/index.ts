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
				age: userData.age,
				city: userData.city,
				email: userData.email,
				full_name: userData.fullName,
				phone: userData.phone,
				state: userData.uf,
				username: userData.username
			}
		)
		return { type: "success" }
	} catch (erro) {
		return { type: "error", error: String(erro) }
	}
}