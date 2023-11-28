import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { TUser } from '../../../context/Auth'
import { db } from '../../../services/firebase'
import { UserData } from '../interfaces'

export type NotifyPetOwnerType = {
	owner: string
	myExpoToken: string
	user: TUser
	petName: string
}

export const serviceNotifyPetOwner = async (
	owner: string,
	myExpoToken: string,
	user: TUser,
	petName: string
) => {
	const data = await getDoc(doc(db, 'users', owner))
	const userData = { id: data.id, ...data.data() } as UserData

	console.log('userData: ', userData)
	console.log('to - from: ', myExpoToken, userData.expoToken)

	try {
		const message = {
			to: userData.expoToken,
			sound: 'default',
			title: 'Adoção',
			body: `${user.full_name} quer adotar seu pet!`,
			data: { someData: `${user.full_name} deseja adotar seu pet de nome ${petName}` },
		}

		console.warn('message: ', message)

		const res = await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		})

		// Extract the ID from the response
		const { data } = await res.json()
		console.log(data)
		if (data.status === 'error') return { type: 'error', error: 'Falha ao enviar mensagem' }

		// add notification to database
		const notification = {
			to: userData.expoToken,
			from: myExpoToken,
			title: message.title,
			body: message.body,
			data: message.data,
			viewed: false,
		}
		await addDoc(collection(db, 'notifications'), notification)

		return { type: 'success' }
	} catch (erro) {
		return { type: 'error', error: String(erro) }
	}
}
