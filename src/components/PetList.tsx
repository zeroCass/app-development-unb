import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
	Query,
	QueryDocumentSnapshot,
	collection,
	getDocs,
	limit,
	query,
	startAfter,
	where,
} from 'firebase/firestore'
import { useCallback, useContext, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
// import { AdoptStackProps } from 'routes/types'
import { AdoptParamList } from 'routes/types'
import { IRegisterPet } from 'screens/PetRegistration/interfaces'
import PetCard from '../components/PetCard'
import { AuthContext } from '../context/Auth'
import { db } from '../services/firebase'

export interface PetData extends IRegisterPet {
	id: string
}

type PetListType = {
	ownerList: boolean
}

const PetList = ({ ownerList }: PetListType) => {
	const { user } = useContext(AuthContext)
	const itemsPerPage = 7
	const [loading, setLoading] = useState(false)
	const [loadingMoreContent, setLoadMoreContent] = useState(false)
	const [petsData, setPetsData] = useState<PetData[]>([])
	const lastDocRef = useRef<QueryDocumentSnapshot>()
	const navigation = useNavigation<StackNavigationProp<AdoptParamList>>()

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
			// console.log(doc.id)
		})

		return dataArray
	}

	const fetchInitialData = async () => {
		if (loading) return
		try {
			setLoading(true)
			let queryMounted: Query

			if (ownerList) {
				// Dynamic query for ownerList true
				queryMounted = query(
					collection(db, 'pet'),
					limit(itemsPerPage),
					where('owner', '==', user.user_uid)
				)
			} else {
				// Default query
				queryMounted = query(
					collection(db, 'pet'),
					limit(itemsPerPage),
					where('willBeAdopted', '==', true)
				)
			}
			const dataArray = await queryDataInDB(queryMounted)
			setPetsData(dataArray)
			// console.log(petsData.length, 'petsData size')
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
			let queryMounted: Query

			if (ownerList) {
				// Dynamic query for ownerList true
				queryMounted = query(
					collection(db, 'pet'),
					startAfter(lastDocRef.current),
					limit(itemsPerPage),
					where('owner', '==', user.user_uid)
				)
			} else {
				// Default query
				queryMounted = query(
					collection(db, 'pet'),
					startAfter(lastDocRef.current),
					limit(itemsPerPage),
					where('willBeAdopted', '==', true)
				)
			}
			const dataArray = await queryDataInDB(queryMounted)
			const newPetsArrys = [...petsData, ...dataArray]
			setPetsData(newPetsArrys)
			// console.log(dataArray.length, 'newPets size')
		} catch (error) {
			console.log(error)
		} finally {
			setLoadMoreContent(false)
		}
	}

	if (loading) {
		return <ActivityIndicator size='large' />
	}

	return (
		<View style={{ padding: 12, backgroundColor: '#fafafa', flex: 1 }}>
			<FlatList
				data={petsData}
				renderItem={({ item }: { item: PetData }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('PetInfo', {
								pet: {
									id: item.id,
									name: item.name,
									owner: ownerList,
								},
							})
						}
					>
						<PetCard
							owner={ownerList}
							name={item.name}
							age_range={item.age_range}
							petId={item.id}
							sex={item.sex}
							size={item.size}
							locaction={item.location}
							willBeAdopted={item.willBeAdopted}
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

export default PetList
