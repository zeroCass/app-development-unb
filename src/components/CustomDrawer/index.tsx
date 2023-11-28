import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
} from '@react-navigation/drawer'
import { useContext } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { AuthContext } from '../../context/Auth'

import Item from './components/Item'
import LogoutButton from './components/LogoutButton'
import SubItem from './components/SubItem'

import { MaterialIcons } from '@expo/vector-icons'
import MeauLOGO from '../../assets/images/Meau_marca.png'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
	const { user, signout } = useContext(AuthContext)
	const userName = user.full_name
	return (
		<View style={styles.container}>
			<DrawerContentScrollView
				contentContainerStyle={{ flex: 1, paddingTop: 0, margin: 0, paddingHorizontal: 0 }}
				{...props}
			>
				<View style={styles.logo}>
					{!user.signed ? (
						<Image style={styles.logoImage} source={MeauLOGO} />
					) : (
						<View style={styles.avatar}></View>
					)}
				</View>
				<View style={styles.content}>
					{!user.signed ? (
						<>
							<DrawerItem label='Login' onPress={() => props.navigation.navigate('Login')} />
							<DrawerItem
								label='Cadastro Pessoal'
								onPress={() => props.navigation.navigate('UserRegister')}
							/>
						</>
					) : (
						<>
							<ScrollView>
								{/* <DrawerItemList {...props} /> */}
								<Item label={userName || ''} style={{ backgroundColor: '#88c9bf' }}>
									<SubItem
										label='Meu Perfil'
										onPress={() => props.navigation.navigate('Profile')}
										underline={true}
									/>
									<SubItem
										label='Meus Pets'
										onPress={() =>
											props.navigation.navigate('AdoptStack', {
												screen: 'MyPets',
											})
										}
										underline={false}
									/>
								</Item>
								<Item
									icon={<MaterialIcons name='pets' size={24} color='black' />}
									label='Atalhos'
									style={{ backgroundColor: '#fee29b' }}
								>
									<SubItem
										label='Cadastrar um pet'
										onPress={() => props.navigation.navigate('PetRegistration')}
									/>
									<SubItem
										label='Adotar um pet'
										onPress={() =>
											props.navigation.navigate('AdoptStack', {
												screen: 'Adopt',
											})
										}
										underline={false}
									/>
								</Item>
								<Item
									icon={<MaterialIcons name='info' size={24} color='black' />}
									label='Informações'
									style={{ backgroundColor: '#cfe9e5' }}
								>
									<SubItem
										label='Notificações'
										onPress={() => props.navigation.navigate('Notifications')}
										underline={true}
									/>
									<SubItem label='Dicas' onPress={() => console.log('Dicas')} underline={false} />
								</Item>
								<Item
									icon={<MaterialIcons name='settings' size={24} color='black' />}
									label='Configurações'
									style={{ backgroundColor: '#e6e7e8' }}
								></Item>
								<DrawerItem
									label='Privacidade'
									onPress={() => console.log('Privacidade')}
									labelStyle={{ color: '#434343' }}
								/>
							</ScrollView>
							<View style={styles.loggoutButton}>
								<LogoutButton onPress={() => signout()} />
							</View>
						</>
					)}
				</View>
			</DrawerContentScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: '#000',
		margin: 0,
		padding: 0,
	},
	logo: {
		flex: 2,
		width: '100%',
		backgroundColor: '#88c9bf',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	logoImage: {
		resizeMode: 'contain',
		width: '80%',
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 50,
		backgroundColor: '#b3b1b1',
	},
	content: {
		flex: 8,
		backgroundColor: '#fff',
	},
	loggoutButton: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
})

export default CustomDrawerContent
