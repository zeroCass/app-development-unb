import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useReducer } from 'react'
import { Linking, Platform, StyleSheet, Text, View } from 'react-native'
import {
    GiftedChat,
    IMessage,
    Send,
    SendProps,
    SystemMessage,
} from 'react-native-gifted-chat'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChatInfoProps } from 'routes/types'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../context/Auth'
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../services/firebase'
import Routes from 'routes'

// const mainUser = {
//     _id: 1,
//     name: 'Developer',
// }

// const otherUser = {
//     _id: 2,
//     name: 'React Native',
//     avatar: 'https://facebook.github.io/react/img/logo_og.png',
// }

interface IState {
    messages: any[]
    step: number
    loadEarlier?: boolean
    isLoadingEarlier?: boolean
    isTyping: boolean
}

enum ActionKind {
    SEND_MESSAGE = 'SEND_MESSAGE',
    LOAD_EARLIER_MESSAGES = 'LOAD_EARLIER_MESSAGES',
    LOAD_EARLIER_START = 'LOAD_EARLIER_START',
    SET_IS_TYPING = 'SET_IS_TYPING',
    // LOAD_EARLIER_END = 'LOAD_EARLIER_END',
}

// An interface for our actions
interface StateAction {
    type: ActionKind
    payload?: any
}

function reducer(state: IState, action: StateAction) {
    switch (action.type) {
        case ActionKind.SEND_MESSAGE: {
            return {
                ...state,
                step: state.step + 1,
                messages: action.payload,
            }
        }
        case ActionKind.LOAD_EARLIER_MESSAGES: {
            return {
                ...state,
                loadEarlier: true,
                isLoadingEarlier: false,
                messages: action.payload,
            }
        }
        case ActionKind.LOAD_EARLIER_START: {
            return {
                ...state,
                isLoadingEarlier: true,
            }
        }
        case ActionKind.SET_IS_TYPING: {
            return {
                ...state,
                isTyping: action.payload,
            }
        }
    }
}

export type TUser = {
	full_name?: string
	username?: string
	age?: number
	email?: string
	phone?: string
	city?: string
	state?: string
	address?: string
	user_uid?: string
	expoToken?: string
}

const ActualChat = ({ route }: ChatInfoProps) => {
    const { user } = useContext(AuthContext)
    const uuidToFetch = route.params.chat.participants.filter((participant: string) => participant !== user.user_uid)[0]
    const [otherUserData, setUserData] = useState<TUser>({})
    if (uuidToFetch) {
        getDoc(doc(db, 'users', uuidToFetch)).then((fetched_data) => {
            setUserData({...fetched_data.data()})
		})
	}
    
    const otherUser = {
        _id: 2,
        name: otherUserData.username,
        avatar: `gs://app-development-unb.appspot.com/user/${uuidToFetch}/profilePicture.png`,
    }
    const mainUser = {
        _id: 1,
        name: user.username,
    }

    const [state, dispatch] = useReducer(reducer, {
        messages: route.params.chat.messages,
        step: 0,
        loadEarlier: true,
        isLoadingEarlier: false,
        isTyping: false,
    })

    const onSend = useCallback(
        (messages: any[]) => {
            const sentMessages = [{ ...messages[0], sent: true, received: true }]
            const newMessages = GiftedChat.append(
                state.messages,
                sentMessages,
                Platform.OS !== 'web',
            )
            updateDoc(doc(db, 'chat', route.params.chat.id), {
				messages: newMessages,
			})
            dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages })
        }, [dispatch, state.messages],
    )

    const onLoadEarlier = useCallback(() => {
        console.log('loading')
        dispatch({ type: ActionKind.LOAD_EARLIER_START })
        const newMessages = GiftedChat.prepend(
            state.messages,
            route.params.chat.messages,
            Platform.OS !== 'web',
        )
        dispatch({ type: ActionKind.LOAD_EARLIER_MESSAGES, payload: newMessages })
    }, [dispatch, state.messages])

    const parsePatterns = useCallback((_linkStyle: any) => {
        return [
            {
                pattern: /#(\w+)/,
                style: { textDecorationLine: 'underline', color: 'darkorange' },
                onPress: () => Linking.openURL('http://gifted.chat'),
            },
        ]
    }, [])

    const onQuickReply = useCallback((replies: any[]) => {
        const createdAt = new Date()
        if (replies.length === 1) {
            onSend([
                {
                    createdAt,
                    _id: Math.round(Math.random() * 1000000),
                    text: replies[0].title,
                    user,
                },
            ])
        } else if (replies.length > 1) {
            onSend([
                {
                    createdAt,
                    _id: Math.round(Math.random() * 1000000),
                    text: replies.map(reply => reply.title).join(', '),
                    user,
                },
            ])
        } else {
            console.warn('replies param is not set correctly')
        }
    }, [])

    const renderQuickReplySend = useCallback(() => {
        return <Text>{' custom send =>'}</Text>
    }, [])

    const setIsTyping = useCallback(
        (isTyping: boolean) => {
            dispatch({ type: ActionKind.SET_IS_TYPING, payload: isTyping })
        },
        [dispatch],
    )

    const onSendFromUser = useCallback(
        (messages: IMessage[] = []) => {
            const createdAt = new Date()
            const messagesToUpload = messages.map(message => ({
                ...message,
                user,
                createdAt,
                _id: Math.round(Math.random() * 1000000),
            }))

            onSend(messagesToUpload)
        },
        [onSend],
    )

    const renderSystemMessage = useCallback((props: any) => {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        )
    }, [])

    const renderSend = useCallback((props: SendProps<IMessage>) => {
        return (
            <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                <MaterialIcons size={30} color={'tomato'} name={'send'} />
            </Send>
        )
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <GiftedChat
                    messages={state.messages}
                    onSend={onSend}
                    loadEarlier={state.loadEarlier}
                    onLoadEarlier={onLoadEarlier}
                    isLoadingEarlier={state.isLoadingEarlier}
                    parsePatterns={parsePatterns}
                    user={mainUser}
                    scrollToBottom
                    onQuickReply={onQuickReply}
                    quickReplyStyle={{ borderRadius: 2 }}
                    quickReplyTextStyle={{
                        fontWeight: '200',
                    }}
                    renderQuickReplySend={renderQuickReplySend}
                    renderSystemMessage={renderSystemMessage}
                    renderSend={renderSend}
                    keyboardShouldPersistTaps='never'
                    timeTextStyle={{
                        left: { color: 'red' },
                        right: { color: 'yellow' },
                    }}
                    isTyping={state.isTyping}
                    inverted={Platform.OS !== 'web'}
                    infiniteScroll
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { backgroundColor: '#ffffff', flex: 1 },
})

export default ActualChat
