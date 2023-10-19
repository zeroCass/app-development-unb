import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../services/firebase';
import { IRegisterUser } from "../interfaces";

export const registerUser: any = (userData: IRegisterUser) => {
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
				.then((userCredential) => {
					const user_uid = userCredential.user.uid;

					setDoc(
						doc(db, "users", user_uid), 
						{
							age: userData.age,
							city: userData.city,
							email: userData.email,
							full_name: userData.fullName,
							phone: userData.phone,
							state: userData.uf,
							username: userData.username
						}
					);
                    // return { type: "success" }	isso aqui causa erro de undefined na pagina userRegister	  
				})
				.catch((error) => {
					console.warn(`registerUser error: ${error}`)
                    // return { type: "error", error: error } isso aqui causa erro de undefined na pagina userRegister	
				});
}