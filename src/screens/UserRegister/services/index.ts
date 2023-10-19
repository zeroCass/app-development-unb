import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, addDoc, collection } from "firebase/firestore";
import { auth, db } from '../../../services/firebase';
import { IRegisterUser } from "../interfaces";

export const registerUser:any = (userData: IRegisterUser) => {
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
				.then((userCredential) => {
					const user_uid = userCredential.user.uid;

					addDoc(
						collection(db, "users"), 
						{
							age: userData.age,
							city: userData.city,
							email: userData.email,
							full_name: userData.fullName,
							phone: userData.phone,
							state: userData.uf,
							username: userData.username,
							auth_id: user_uid
						}
					).then(() => {
						return { type: "success" }
					}).catch((error) => {return { type: "error", error: error }});
				})
				.catch((error) => {
                    return { type: "error", error: error }
				});
}