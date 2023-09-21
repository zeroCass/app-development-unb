import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import MainButton from '../../components/MainButton'
import TopSideMenu from '../../components/TopSideMenu'
import AppLoading from 'expo-app-loading';
import { useFonts, Courgette_400Regular } from '@expo-google-fonts/courgette';

const LoginError = () => {
    const [fontsLoaded] = useFonts({
        Courgette_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.topContainer}>
            <TopSideMenu title='Cadastro' />
            <View style={styles.container}>
                <Text style={styles.opsText}>Ops!</Text>
                <View style={styles.optionsContainer}>
                    <Text style={styles.regularText}>Você não pode realizar esta ação sem possuir um cadastro.</Text>
                    <MainButton text={'Fazer Cadastro'} />
                </View>
                <View style={styles.optionsContainer}>
                    <Text style={styles.regularText}>Já possui cadastro?</Text>
                    <MainButton text={'Fazer Login'} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
      backgroundColor: '#fafafa',
      display: 'flex',
      alignItems: 'center',
	},
  opsText: {
      textAlign: 'center',
      fontFamily: 'Courgette_400Regular',
      fontSize: 64,
      color: '#88C9BF',
      marginTop: 64,
    },
    optionsContainer: {
      marginTop: 64,
      display: 'flex',
      alignItems: 'center',
      width: '65%',
    },
    regularText: {
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 14,
      color: '#757575',
      marginBottom: 16,
    }
})

export default LoginError