import { FlatList, Text, TouchableOpacity, View } from 'react-native'


const pets = [
    {
        id: 1,
        name: "Snow",
        gender: "Male",
        location: "WinterFell"
    },
    {
        id: 2,
        name: "Pequi",
        gender: "Male",
        location: "Samabaia - Sul"
    },
    {
        id: 3,
        name: "Satanas",
        gender: "Male",
        location: "Vila do Chaves"
    },
    {
        id: 3,
        name: "Leia",
        gender: "Female",
        location: "Some Place of Galaxy"
    },
]

const Adopt = ({ navigation }: any) => {
    return (
        <View>
        <FlatList
            data={pets}
            renderItem={({ item }: { item: any }) => (
                <TouchableOpacity onPress={() => navigation.navigate("PetInfo", {
                        name: item.name,
                        gender: item.gender,
                        location: item.location,
                })}>
                    <View style={{ backgroundColor: "red", margin: 10 }}>
                        <Text>Nome do Pet: {item.name}</Text>
                        <Text>Local: {item.location}</Text>
                    </View>
                </TouchableOpacity>
                
            )}
            keyExtractor={item => item.id.toString()}
        />
        </View>
    )
}

export default Adopt