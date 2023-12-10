import {
    IMessage
} from 'react-native-gifted-chat'

export interface ChatData {
    id: string
    participants: string[]
    lastMessage: IMessage
    otherUserUID: string
    otherUserUsername: string
}