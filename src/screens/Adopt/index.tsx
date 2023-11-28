import { useFocusEffect } from '@react-navigation/native'
import {
	Query,
	QueryDocumentSnapshot,
	collection,
	getDocs,
	limit,
	query,
	startAfter,
} from 'firebase/firestore'
import { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
import { AdoptStackProps } from 'routes/types'
import { IRegisterPet } from 'screens/PetRegistration/interfaces'
import { db } from '../../services/firebase'
import PetCard from './components/PetCard'

export interface PetData extends IRegisterPet {
	id: string
	owner: string
}

const Adopt = ({ navigation }: AdoptStackProps) => {
	const itemPerPage = 7
	const [loading, setLoading] = useState(false)
	const [loadingMoreContent, setLoadMoreContent] = useState(false)
	const [petsData, setPetsData] = useState<PetData[]>([])
	const lastDocRef = useRef<QueryDocumentSnapshot>()

	// fetch initial data
	useFocusEffect(
		useCallback(() => {
			fetchInitialData()
			return () => setPetsData([])
		}, [])
	)

	const queryDataInDB = async (queryMounted: Query): Promise<PetData[]> => {
		const querySnapshot = await getDocs(queryMounted)
		// last visible document
		lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1]
		const dataArray: any[] = []
		// build the data to be insert into pets array
		querySnapshot.forEach((doc) => {
			const data = doc.data()
			dataArray.push({ id: doc.id, ...data })
			console.log(doc.id)
		})

		return dataArray
	}

	const fetchInitialData = async () => {
		if (loading) return
		try {
			setLoading(true)
			const q = query(collection(db, 'pet'), limit(itemPerPage))
			const dataArray = await queryDataInDB(q)
			setPetsData(dataArray)
			console.log(petsData.length, 'petsData size')
		} catch (error) {
			console.warn(error)
		} finally {
			setLoading(false)
		}
	}

	const fetchMoreData = async () => {
		if (loadingMoreContent) return
		if (!lastDocRef.current) return

		try {
			setLoadMoreContent(true)
			const q = query(collection(db, 'pet'), startAfter(lastDocRef.current), limit(itemPerPage))
			const dataArray = await queryDataInDB(q)
			const newPetsArrys = [...petsData, ...dataArray]
			setPetsData(newPetsArrys)
			console.log(dataArray.length, 'newPets size')
		} catch (error) {
			console.log()
		} finally {
			setLoadMoreContent(false)
		}
	}

	if (loading) {
		return <ActivityIndicator size='large' />
	}

	return (
		<View style={{ padding: 12, backgroundColor: '#fafafa' }}>
			<FlatList
				data={petsData}
				renderItem={({ item }: { item: PetData }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('PetInfo', {
								pet: {
									id: item.id,
									name: item.name,
								},
							})
						}
					>
						<PetCard
							name={item.name}
							age_range={item.age_range}
							petId={item.id}
							sex={item.sex}
							size={item.size}
						/>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.1}
				onEndReached={() => fetchMoreData()}
				ListFooterComponent={loadingMoreContent ? <FooterComponent /> : null}
			/>
		</View>
	)
}

const FooterComponent = () => {
	return (
		<View>
			<ActivityIndicator size='large' color='red' />
		</View>
	)
}

export default Adopt
