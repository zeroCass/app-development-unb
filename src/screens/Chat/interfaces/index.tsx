import {
    IMessage
} from 'react-native-gifted-chat'

export interface ChatData {
    id: string
    participants: string[]
    messages: IMessage[]
}