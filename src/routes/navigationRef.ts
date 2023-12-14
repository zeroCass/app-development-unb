import { NavigationContainerRef } from '@react-navigation/native'
import { createURL, openURL } from 'expo-linking'
import React from 'react'
import { Alert } from 'react-native'
import { RootDrawerParamList } from './types'

export const navigationRef = React.createRef<NavigationContainerRef<RootDrawerParamList>>()

export const navigate = (name: keyof RootDrawerParamList, params: any, from?: any) => {
	if (navigationRef.current?.isReady()) {
		console.warn('navigation ready from: ', from)
		navigationRef.current?.navigate(name, params)
	} else {
		console.warn('navigation was not ready from: ', from)
	}
}

export const openLinkURL = async (screen: string) => {
	const rootPath = createURL('/')
	try {
		await openURL(`${rootPath}${screen}`)
	} catch (error) {
		Alert.alert(
			'Erro ao abrir página',
			`${error}`,
			[
				{
					text: 'Ok',
				},
			],
			{
				cancelable: true,
			}
		)
		console.warn(error)
	}
}
