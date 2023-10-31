import type { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type DrawerParamList = {
	Login: undefined
	UserRegister: undefined
	Profile: undefined
	PetRegistration: undefined
	AdoptStack: NavigatorScreenParams<AdoptParamList>
}

type Pet = {
	name: string
	gender: string
	location: string
}

export type AdoptParamList = {
	Adopt: undefined
	PetInfo: { pet: Pet } | undefined
}

export type AdoptStackProps = NativeStackScreenProps<AdoptParamList>
export type RootProps = DrawerScreenProps<DrawerParamList>
export type RootComposeProps = CompositeScreenProps<
	NativeStackScreenProps<AdoptParamList, 'Adopt'>,
	DrawerScreenProps<DrawerParamList>
>
