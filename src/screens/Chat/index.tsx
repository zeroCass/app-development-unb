import { useCallback, useContext, useEffect, useState } from 'react'
import { GiftedChat, QuickReplies, User } from 'react-native-gifted-chat'
import { ChatProps } from 'routes/types'
import { AuthContext } from '../../context/Auth'

// type chatDataType = {
// 	id: string
// 	from: string
// 	to: string
// 	bodyText: string
// 	data: any
// }

export interface IMessage {
	_id: string | number
	text: string
	createdAt: Date | number
	user: User
	image?: string
	video?: string
	audio?: string
	system?: boolean
	sent?: boolean
	received?: boolean
	pending?: boolean
	quickReplies?: QuickReplies
}

const Chat = ({ navigation }: ChatProps) => {
	const [messages, setMessages] = useState<IMessage[]>([])
	const { user } = useContext(AuthContext)

	// Verificar o setMessages
	useEffect(() => {
		setMessages([
			{
				_id: 1,
				text: `Olá, ${user.full_name}`,
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		])
	}, [])
	const onSend = useCallback((messages: IMessage[]) => {
		setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
	}, [])
	return (
		<GiftedChat
			messages={messages}
			showAvatarForEveryMessage={true}
			onSend={(messages: IMessage[]) => onSend(messages)}
			user={{
				_id: user.user_uid,
				name: user.full_name,
			}}
		/>
	)
}

export default Chat
