import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../services/firebase';
import { UserData } from "../interfaces";

export const serviceNotifyPetOwner:any = async (owner: string) => {
    
    const data = await getDoc(doc(db, 'users', owner))
    const userData = { id: data.id, ...data.data() } as UserData

	try {
		const message = {
            to: userData.expoToken,
            sound: 'default',
            title: 'Adoção',
            body: 'Uma pessoa quer adotar seu pet!',
            data: { someData: 'goes here' },
        };
    
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(message),
        });
		return { type: "success" }
	} catch (erro) {
		return { type: "error", error: String(erro) }
	}
}