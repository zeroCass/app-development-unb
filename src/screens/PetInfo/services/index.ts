import {
	Query,
	Timestamp,
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore'
import { PetData } from '../../../components/PetList'
import { TUser } from '../../../context/Auth'
import { db } from '../../../services/firebase'
import { UserData } from '../interfaces'

export type NotifyPetOwnerType = {
	owner: string
	myExpoToken: string
	user: TUser
	pet: PetData
}

type NotificationExistsReturnType = {
	result: 'notFound' | 'found' | 'error'
	text?: 'Notificação já enviada' | 'O dono do animal recusou o seu pedido de adoção'
}

export type TserviceNotifyPetOwnerReturn = {
	type: 'success' | 'error' | 'found'
	error?: string
	text?: 'Notificação já enviada' | 'O dono do animal recusou o seu pedido de adoção'
}

const notifictionExists = async (
	recieverID: string,
	senderID: string,
	petID: string
): Promise<NotificationExistsReturnType> => {
	try {
		const queryMounted: Query = query(
			collection(db, 'notifications'),
			where('recieverID', '==', recieverID),
			where('senderID', '==', senderID),
			where('petID', '==', petID)
		)
		const notification = await getDocs(queryMounted)
		if (notification.size === 0) {
			return { result: 'notFound' }
		}
		if (notification.size !== 0) {
			const data = notification.docs[0]?.data()
			const text = data?.disagrement
				? 'O dono do animal recusou o seu pedido de adoção'
				: 'Notificação já enviada'
			return { result: 'found', text }
		}
	} catch (error) {
		console.warn(error)
		return { result: 'error' }
	}

	return { result: 'error' }
}

type TSendNotification = {
	to: string
	sound: string
	title: string
	body: string
	data: {
		someData: string
	}
}
const sendNotification = async (message: TSendNotification): Promise<any> => {
	const response = await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	})

	// Extract the ID from the response
	const responseData = await response.json()
	return responseData
}

export const serviceNotifyPetOwner = async (
	owner: string,
	myExpoToken: string,
	user: TUser,
	pet: PetData
): Promise<TserviceNotifyPetOwnerReturn> => {
	const data = await getDoc(doc(db, 'users', owner))
	const ownerData = { user_uid: data.id, ...data.data() } as UserData

	try {
		const exists = await notifictionExists(ownerData.user_uid, user.user_uid, pet.id)
		if (exists.result === 'found') {
			return { type: 'found', text: exists.text }
		}

		// send notification
		const message = {
			to: ownerData.expoToken,
			sound: 'default',
			title: 'Adoção',
			body: `${user.full_name} quer adotar seu pet!`,
			data: { someData: `${user.full_name} deseja adotar seu pet de nome ${pet.name}` },
		}

		const response = await sendNotification(message)
		console.log('response: ', response)

		// Extract the ID from the response

		if (!response.data && response.errors) {
			console.log('sendNotification error: ', response.errors[0].message)
			return { type: 'error', error: String(response.errors[0].message) }
		}

		// add notification to database
		const notification = {
			message: {
				to: ownerData.expoToken,
				from: myExpoToken,
				title: message.title,
				body: message.body,
				data: message?.data || {},
			},
			petID: pet.id,
			recieverID: ownerData.user_uid,
			senderID: user.user_uid,
			agrement: false,
			disagrement: false,
			viewed: false,
			date: Timestamp.fromDate(new Date()),
		}
		await addDoc(collection(db, 'notifications'), notification)
		return { type: 'success' }
	} catch (erro) {
		return { type: 'error', error: String(erro) }
	}
}
