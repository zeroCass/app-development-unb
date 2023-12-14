import { NavigationContainerRef } from '@react-navigation/native'
import React from 'react'
import { RootDrawerParamList } from './types'

export const navigationRef = React.createRef<NavigationContainerRef<RootDrawerParamList>>()

export const navigate = (name: keyof RootDrawerParamList, params: any) => {
	if (navigationRef.current?.isReady()) {
		navigationRef.current?.navigate(name, params)
	} else {
		console.warn('navigation was not ready')
	}
}
