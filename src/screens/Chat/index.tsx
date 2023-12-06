import {
	Query,
	QueryDocumentSnapshot,
	collection,
	getDocs,
	limit,
	query,
	startAfter,
	where,
} from 'firebase/firestore'

import { db } from '../../services/firebase'

import { StyleSheet, View } from 'react-native'
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

type chatDataType = {
	id: string
	from: string
	to: string
	bodyText: string
	data: any
}

const Chat = ({ navigation }) => {
	const [messages, setMessages] = useState([])

	// Verificar o setMessages
	useEffect(() => {
		setMessages([
			{
				_id: 1, 
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		])
	}, [])
	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
	}, [])
	return (
		<GiftedChat
			messages={messages}
			showAvatarForEveryMessage={true}
			onSend={(messages) => onSend(messages)}
			user={{
				_id: auth?.currentUser?.email,
				name: auth?.currentUser?.displayName,
				avatar: auth?.currentUser?.photoURL,
			}}
		/>
	)
}

export default Chat
