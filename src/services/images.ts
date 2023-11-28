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
	setUrls: (url: string[]) => void
}

interface fethedUrl extends fetchImageProps {
	setUrl: (url: string) => void
}

interface fethedUrls extends fetchImagesProps {
	setUrls: (url: string[]) => void
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
	setUrls,
}: fetchImagesProps) => {
	const imagesUrl: string[] = []
	setLoading(true)
	try {
		const images = await listAll(ref(storage, `${entityFolder}/${entityID}`))
		for (let object of images.items) {
			const url = await getDownloadURL(ref(storage, object.fullPath))
			// console.log('url:', url)
			imagesUrl.push(url)
		}
		setUrls(imagesUrl)
	} catch (error) {
		console.log('fetchImage error: ', error)
	} finally {
		setLoading(false)
	}
}

export const fetchedImageUrl = async ({ setUrl, setLoading, storageUrl }: fethedUrl) => {
	const fetchedUrl = await fetchImage({
		storageUrl,
		setLoading,
	})
	setUrl(fetchedUrl)
}

export const fetchedImagesUrl = async ({
	setUrls,
	setLoading,
	entityFolder,
	entityID,
}: fethedUrls) => {
	await fetchImages({
		entityFolder,
		entityID,
		setLoading,
		setUrls,
	})
}
