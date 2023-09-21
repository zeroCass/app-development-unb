import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import MainButton from '../../components/MainButton'
import TopSideMenu from '../../components/TopSideMenu'

const RegisterError = () => {
    return (
        <SafeAreaView>
            <TopSideMenu title='Cadastro' />
            <View style={styles.container}>
                <View>
                    <MainButton text={'Fazer Cadastro'} />
                </View>
                <View>
                    <MainButton text={'Fazer Login'} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#fafafa',
	}
})

export default RegisterError