import type { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ChatData } from 'screens/Chat/interfaces'

type Pet = {
	id: string
	name: string
	owner?: boolean
}

export type AdoptParamList = {
	Adopt: undefined
	PetInfo: { pet: Pet }
	MyPets: undefined
}

export type ChatParamList = {
	Chat: undefined
	ActualChat: {chat: ChatData}
}

export type RootDrawerParamList = {
	Login: undefined
	UserRegister: undefined
	Profile: undefined
	PetRegistration: undefined
	AdoptStack: NavigatorScreenParams<AdoptParamList>
	Notifications: undefined
	ChatStack: NavigatorScreenParams<ChatParamList>
}

export type PetRegistrationProps = DrawerScreenProps<RootDrawerParamList, 'PetRegistration'>

export type ChatStackProps = NativeStackScreenProps<ChatParamList>
export type ChatInfoProps = CompositeScreenProps<
	NativeStackScreenProps<ChatParamList, 'ActualChat'>,
	DrawerScreenProps<RootDrawerParamList>
>

export type AdoptStackProps = NativeStackScreenProps<AdoptParamList>
export type PetInfoProps = CompositeScreenProps<
	NativeStackScreenProps<AdoptParamList, 'PetInfo'>,
	DrawerScreenProps<RootDrawerParamList>
>
