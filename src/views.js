import moment from 'moment'
import { sortEntries, createEntry, getEntries, removeEntry } from './entries'
import { getCountdownTimer, getPrompt } from './requests'
import { getFilters } from './filters'

const getFullScreen = () =>  {
	const checkbox = document.querySelector('#fullscreen')
	const textEditorEl = document.querySelector('#entry-input')
	if(document.fullscreenEnabled && checkbox.checked){
		document.body.requestFullscreen()
		generateTimerDOM()
	}
}

const clearFullScreen = () => {
	if((window.fullScreen)||(window.innerWidth == screen.width && window.innerHeight == screen.height)){
		document.exitFullscreen()
	}
}

const generatePrompt = () => { 
	const promptEl = document.querySelector('#prompt')
	getPrompt().then((result) => {
		promptEl.textContent = result
	})
}

const renderEntry = (entryId) => {
	const entries = getEntries()
	const promptEl = document.querySelector('#prompt')
	const entryTitleEl = document.querySelector('#stored-prompt')
	const entryBodyEl = document.querySelector('#stored-entry')

	entries.forEach((entry) => {
		if(entry.id === entryId){
			entryTitleEl.textContent = entry.title
			entryBodyEl.textContent = entry.body
		}
	})

	if(promptEl.textContent.length > 0){
		promptEl.textContent = ''
	}
}

const clearEntryDOM = () => {
	document.querySelector('#stored-prompt').textContent = ''
	document.querySelector('#stored-entry').textContent = ''
}

const generateEntryListDOM = (entry) => {
	const entryEl = document.createElement('a')
	const entryTextEl = document.createElement('a')
	const removeButton = document.createElement('button')
	const timestampEl = document.createElement('span')
	const createdEl = document.createElement('p')
	const promptEl = document.querySelector('#prompt')
	const promptLength = entry.promptLength === '600' ? '10 min' :
											 entry.promptLength === '300' ? '5 min' :
											 '90 sec'

		if(entry.title.length > 0) {
			entryTextEl.textContent = `${entry.title} ( ${promptLength} )`
		}

		entryEl.appendChild(entryTextEl)
		entryTextEl.setAttribute('id', entry.id)
		entryEl.classList.add('entry-list__items')

		createdEl.textContent = timestampUpdate(entry.createdAt)
		createdEl.classList.add('timestamp')

		
		removeButton.textContent = "delete"
		removeButton.setAttribute('id', entry.id)
		removeButton.classList.add('button', 'btn--tertiary')
		entryEl.appendChild(createdEl)
		entryEl.appendChild(removeButton)
		
		removeButton.addEventListener('click', (e) => {
			removeEntry(e.target.id)
			renderEntriesList()
		})

	return entryEl
}

const renderEntriesList = () => {
	const entriesEl = document.querySelector('#entry-list__items')
	const filters = getFilters()
	const entries = sortEntries(filters.sortBy)
	const filteredEntries = entries.filter((entry) => entry.title.toLowerCase().includes(filters.searchText.toLowerCase()))

	entriesEl.innerHTML = ''

	if(filteredEntries.length > 0) {
		filteredEntries.forEach((entry) =>{
		const entryEl = generateEntryListDOM(entry)
		entriesEl.appendChild(entryEl)

	})

	} else { 
			const emptyMessage = document.createElement('p')
			emptyMessage.textContent = 'No entries to show'
			// emptyMessage.classList.add('empty-message')
			entriesEl.appendChild(emptyMessage)
	}
}

const generateTimerDOM = () =>  {
		const entryBodyEl = document.querySelector('#entry-input')
		const entryTitleEl = document.querySelector('#prompt')
		const promptStickyEl = document.querySelector('.prompt--sticky')
		const countdownClock = document.createElement('p')
		const timer = document.querySelector('#prompt-length')
		document.body.appendChild(countdownClock)
		countdownClock.classList.add('countdown-clock')
		countdownClock.innerHTML = ''
	 	const countdownTimer = getCountdownTimer(timer.value, countdownClock).then((data)  => {
	 		if(data === undefined) {
	 			const id = createEntry()
	 			entryBodyEl.hidden = true
	 			entryBodyEl.value = ''
	 			entryTitleEl.textContent =''
	 			renderEntriesList()
	 			clearFullScreen()
	 			document.body.removeChild(countdownClock)
	 			document.body.removeChild(promptStickyEl)
	 		}
		}, (err) => {
	console.log(err)
	 })
}

const generateTextEditorDOM = () => {
	const entryBodyEl = document.querySelector('#entry-input')
	const errorEl = document.querySelector('#prompt-error')
	const promptButtonEl = document.querySelector('#generate-prompt')
	const promptEl = document.querySelector('#prompt')
	const promptStickyEl = document.createElement('h2')

	promptButtonEl.onclick = () => errorEl.textContent = ''

	if(promptEl.textContent === '') {
		errorEl.textContent = 'Generate prompt first'
		throw new error('Generate prompt first')
	} else {	
		errorEl.textContent = ''
		entryBodyEl.disabled = false
		entryBodyEl.hidden = false
		entryBodyEl.select()
		document.body.appendChild(promptStickyEl)
		promptStickyEl.textContent = `Prompt: ${promptEl.textContent}`
		promptStickyEl.classList.add('prompt--sticky')
		getFullScreen()
		generateTimerDOM()	
	}
}

const timestampUpdate = (timestamp) => `Created: ${moment(timestamp).format('M/D/YY')}`


export { getFullScreen, generatePrompt, renderEntriesList, renderEntry, generateTextEditorDOM, clearEntryDOM }
