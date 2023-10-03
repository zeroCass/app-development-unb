import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import MainButton from '../../components/MainButton'
import TopSideMenu from '../../components/TopSideMenu'
import ShowValue from '../../components/ShowValue'
import ProfilePhoto from '../../components/ProfilePhoto'

const Perfil = () => {
	const userInfo = {
		name: 'Marília Martins',
		fullName: 'Marilia Martins de Souza',
		age: '27 anos',
		email: 'marilia_martins@gmail.com',
		location: 'Sobradinho - Distrito Federal',
		address: 'Rua 203, conjunto B, casa 37',
		phone: '(61) 98274 - 2947',
		username: 'mari_martins',
		history: 'Adotou 1 gato'

	}

	return (
		<>
			<SafeAreaView>
				<ScrollView >
					<View style={styles.container}>
						<TopSideMenu title='Meu Perfil' />
						<ProfilePhoto> </ProfilePhoto>
						<Text style={styles.titleText}>
							<Text style={styles.innerText}>{userInfo.name}</Text>
						</Text>

						<ShowValue title='NOME COMPLETO' value={userInfo.fullName} />

						<ShowValue title='IDADE' value={userInfo.age} />

						<ShowValue title='EMAIL' value={userInfo.email} />

						<ShowValue title='LOCALIZAÇÃO' value={userInfo.location} />

						<ShowValue title='ENDEREÇO' value={userInfo.address} />

						<ShowValue title='TELEFONE' value={userInfo.phone} />

						<ShowValue title='NOME DE USUÁRIO' value={userInfo.username} />

						<ShowValue title='Histórico' value={userInfo.history} />

						<View style={styles.buttonContainer}>
							<MainButton text={'Editar Perfil'} />
						</View>

					</View>

				</ScrollView>
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleText: {
		fontSize: 20,
	},
	innerText: {
		fontWeight: 'bold',
	},
	baseText: {
		fontSize: 16,
	}
})

export default Perfil
