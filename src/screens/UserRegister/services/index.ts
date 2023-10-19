import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '../../../services/firebase'
import { IRegisterUser } from "../interfaces";

export const registerUser: any = (userData: IRegisterUser) => {
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
				.then((userCredential) => {
					const user_uid = userCredential.user.uid;

					addDoc(
						collection(db, "users"), 
						{
							age: userData.age,
							city: userData.city,
							email: userData.email,
							firebase_auth_uid: user_uid,
							full_name: userData.fullName,
							phone: userData.phone,
							state: userData.uf,
							username: userData.username
						}
					);
                    return { type: "success" }				  
				})
				.catch((error) => {
                    return {type: "error", error: error }
				});
}