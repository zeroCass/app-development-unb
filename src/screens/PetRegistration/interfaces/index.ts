export interface TemperamentType {
	Brincalhão: boolean
	Tímido: boolean
	Calmo: boolean
	Guarda: boolean
	Amoroso: boolean
	Preguiçoso: boolean
}

export interface CommonData {
	temperament: TemperamentType
	specie: string
	gender: string
	size: string
	age: string
	vaccinated: boolean
	dewormed: boolean
	castrated: boolean
	sick: boolean
	diseases: string
}

interface petHealth {
	castrated: boolean
	dewormed: boolean
	diseases: string
	sick: boolean
	vaccinated: boolean
}

interface financialPreferences {
	food: boolean
	health: boolean
	toys: boolean
}

interface sponsorshipPreferences {
	financial: financialPreferences
	sponsorshipTerm: boolean
	visits: boolean
}

interface helpPreferences {
	financial: boolean
	food: boolean
	medicine: [string]
	toys: [string]
}

export interface followUpVisitsPreferences {
	oneMonth: boolean
	sixMonths: boolean
	threeMonths: boolean
}

export interface adoptionPreferences {
	adoptionTerm: boolean
	followUpVisits: followUpVisitsPreferences
	housePhotos: boolean
	testVisit: boolean
}

export interface IRegisterPet {
	id?: string
	about: string
	age_range: string
	name: string
	petHealth: petHealth
	photos: [string]
	sex: string
	size: string
	species: string
	temper: [string]
	owner: string
	sponsorshipPreferences?: sponsorshipPreferences
	helpPreferences?: helpPreferences
	adoptionPreferences?: adoptionPreferences
}