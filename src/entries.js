import uuidv4 from 'uuid/v4'
import moment from 'moment'

let entries = []

const loadEntries = () => {
	const entriesJSON = localStorage.getItem('entries')

	try {
		return entriesJSON ? JSON.parse(entriesJSON) : []
	} catch (e) {
		return []
	}
}

const saveEntry = () => {
	localStorage.setItem('entries', JSON.stringify(entries))
}

const getEntries = () => entries

const createEntry = () => {
	const titleEl = document.querySelector('#prompt')
	const bodyEl = document.querySelector('#entry-input')
	const promptEl = document.querySelector('#prompt-length')
	const id = uuidv4()
	const timestamp = moment().valueOf()

	entries.unshift({
		id,
		title: titleEl.textContent,
		body: bodyEl.value,
		createdAt: timestamp,
		promptLength:promptEl.value
	})
	saveEntry()

	return id
}

const removeEntry = (entryId) => {
	const entries = getEntries()

	const deleteEntry = entries.findIndex((entry) => entry.id === entryId)

	if (deleteEntry > -1){
		entries.splice(deleteEntry, 1)
	} 
	saveEntry()
}

const sortEntries = (sortBy) => {
	if (sortBy === 'byCreated') {
		return entries.sort((a, b) => {
			if (a.createdAt > b.createdAt) {
				return -1
			} else if (a.createdAt < b.createdAt) {
				return 1
			} else {
				return 0
			}
		})
	} else if (sortBy === 'byPromptLength') {
			return entries.sort((a, b) =>  {
				if (parseInt(a.promptLength) > parseInt(b.promptLength)){
					return -1
				} else if (parseInt(a.promptLength) < parseInt(b.promptLength)){
					return 1
				} else{
					return 0
				}
			})
	} else if (sortBy === 'alphabetical') {
			return entries.sort((a, b) => {
				if (a.title.toLowerCase() < b.title.toLowerCase()) {
					return -1
				} else if (a.title.toLowerCase() > b.title.toLowerCase()) {
					return 1
				} else {
					return 0
				}
			})
	} else {
		return entries
	}
}

const downloadEntry = () => {
	// download entry to computer
}

entries = loadEntries()


export { saveEntry, createEntry, sortEntries, getEntries, removeEntry }
