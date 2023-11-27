import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from './firebase'

interface fetchImageProps {
	storageUrl: string
	setLoading: (state: boolean) => void
}

interface fetchImagesProps {
	entityFolder: string
	entityID: string
	setLoading: (state: boolean) => void
}

interface fethedUrl extends fetchImageProps {
	setUrl: (url: string) => void
}

interface fethedUrls extends fetchImagesProps {
	setUrl: (url: string[]) => void
}

export const fetchImage = async ({ storageUrl, setLoading }: fetchImageProps): Promise<string> => {
	let url = ''
	setLoading(true)
	try {
		url = await getDownloadURL(ref(storage, storageUrl))
	} catch (error) {
		console.log('fetchImage error: ', error)
	} finally {
		setLoading(false)
	}

	return url
}

export const fetchImages = async ({
	entityFolder,
	entityID,
	setLoading,
}: fetchImagesProps): Promise<string[]> => {
	const imagesUrl: string[] = []
	setLoading(true)
	try {
		const images = await listAll(ref(storage, `${entityFolder}/${entityID}`))
		images.items.forEach((itemRef) => {
			imagesUrl.push(itemRef.fullPath)
		})
	} catch (error) {
		console.log('fetchImage error: ', error)
	} finally {
		setLoading(false)
	}

	return imagesUrl
}

export const fetchedImageUrl = async ({ setUrl, setLoading, storageUrl }: fethedUrl) => {
	const fetchedUrl = await fetchImage({
		storageUrl,
		setLoading,
	})
	setUrl(fetchedUrl)
}

export const fetchedImagesUrl = async ({
	setUrl,
	setLoading,
	entityFolder,
	entityID,
}: fethedUrls) => {
	const fetchedUrl = await fetchImages({
		entityFolder,
		entityID,
		setLoading,
	})
	setUrl(fetchedUrl)
}
