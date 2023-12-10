import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useReducer, useLayoutEffect } from 'react'
import { Linking, Platform, StyleSheet, Text, View } from 'react-native'
import {
    GiftedChat,
    IMessage,
    Send,
    SendProps,
    SystemMessage,
    User,
} from 'react-native-gifted-chat'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChatInfoProps } from 'routes/types'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../context/Auth'
import { doc, updateDoc, Timestamp, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore'
import { db, storage } from '../../../services/firebase'
import { getDownloadURL, ref } from 'firebase/storage'


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

const ActualChat = ({ route }: ChatInfoProps) => {
    const { user } = useContext(AuthContext)
    const [messages, setMessages] = useState<IMessage[]>([])
    const [chatHistoryID, setChatHistory] = useState<string>('')
    const [mainUser, setMainUser] = useState<User>({} as User)

    useEffect(() => {
        const getChatHistory = async () => {
            const q = query(collection(db, "chatHistory"), where("chat", "==", route.params.chat.id));
            const querySnapshot = await getDocs(q);
            for (const doc of querySnapshot.docs) {
                const messagesHist = doc.data().messages
                messagesHist.forEach((message: any) => {
                    message.createdAt = new Timestamp(
                        message.createdAt.seconds, message.createdAt.nanoseconds
                    ).toDate()
                });
                setChatHistory(doc.id)
                setMessages(messagesHist)
                dispatch({ type: ActionKind.LOAD_EARLIER_MESSAGES, payload: messagesHist })
            };
        };

        const getUsers = async () => {
            if (route.params.chat.lastMessage.user.name == user.username) {
                setMainUser(route.params.chat.lastMessage.user)
            } else {
                const avatar = await getDownloadURL(ref(storage, `user/${user.user_uid}/profilePicture.png`))
                setMainUser({
                    _id: route.params.chat.lastMessage.user._id == 1 ? 2 : 1,
                    name: user.username,
                    avatar: avatar,
                })
            }
        }

        getChatHistory();
        getUsers();

        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    useLayoutEffect(() => {
        const q = query(collection(db, "chatHistory"), where("chat", "==", route.params.chat.id));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });
        return unsubscribe;
    }, []);

    const [state, dispatch] = useReducer(reducer, {
        messages: messages,
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
            updateDoc(doc(db, 'chatHistory', chatHistoryID), {
                messages: newMessages,
            })
            updateDoc(doc(db, 'chat', route.params.chat.id), {
                lastMessage: newMessages[0],
            })
            dispatch({ type: ActionKind.SEND_MESSAGE, payload: newMessages })
        }, [dispatch, state.messages],
    )

    const onLoadEarlier = useCallback(() => {
        console.log('loading')
        dispatch({ type: ActionKind.LOAD_EARLIER_START })
        const newMessages = GiftedChat.prepend(
            state.messages,
            messages,
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
                    mainUser,
                },
            ])
        } else if (replies.length > 1) {
            onSend([
                {
                    createdAt,
                    _id: Math.round(Math.random() * 1000000),
                    text: replies.map(reply => reply.title).join(', '),
                    mainUser,
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
                mainUser,
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
