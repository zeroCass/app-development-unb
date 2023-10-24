import { Text, View } from "react-native"

const PetInfo = ({ route }: any) => {
    const pet = route.params
    return (
        <View>
            <Text>Foto do Anibal</Text>
            <Text>Nome: {pet.name}</Text>
            <Text>Sexo: {pet.gender}</Text>
            <Text>Localidade: {pet.location}</Text>
        </View>
    )
}

export default PetInfo