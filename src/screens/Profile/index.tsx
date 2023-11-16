import { getDownloadURL, ref } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import MainButton from '../../components/MainButton'
import { AuthContext } from '../../context/Auth'
import { storage } from '../../services/firebase'
import ProfilePhoto from './components/ProfilePhoto'
import ShowValue from './components/ShowValue'

const Profile = () => {
	const { user } = useContext(AuthContext)
	const [urlT, setUrlT] = useState({
		loading: true,
		source: { uri: '' },
	})
	const mockHistory = 'Adotou 1 gato'

	useEffect(() => {
		fetchProfileImage()
	}, [])

	const fetchProfileImage = () => {
		getDownloadURL(ref(storage, `user/${user.user_uid}/profilePicture.png`))
			.then((x) => {
				setUrlT({
					loading: false,
					source: { uri: x },
				})
			})
			.catch((error) => {
				console.warn('profile: ', error)
				setUrlT({
					loading: false,
					source: require('../../assets/images/default-pf.png'),
				})
			})
	}

	return (
		<>
			<SafeAreaView>
				<ScrollView>
					<View style={styles.container}>
						<ProfilePhoto url={urlT}></ProfilePhoto>
						<Text style={styles.titleText}>
							<Text style={styles.innerText}>{user.full_name}</Text>
						</Text>

						<ShowValue title='NOME COMPLETO' value={user.full_name} />

						<ShowValue title='IDADE' value={String(user.age)} />

						<ShowValue title='EMAIL' value={user.email} />

						<ShowValue title='LOCALIZAÇÃO' value={user.state + ', ' + user.city} />

						<ShowValue title='ENDEREÇO' value={user.address} />

						<ShowValue title='TELEFONE' value={user.phone} />

						<ShowValue title='NOME DE USUÁRIO' value={user.username} />

						<ShowValue title='Histórico' value={mockHistory} />

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
	},
	buttonContainer: {
		marginBottom: 20,
	},
})

export default Profile
