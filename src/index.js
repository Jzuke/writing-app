import "core-js/stable"
import "regenerator-runtime/runtime"
import moment from 'moment'
import { setFilters } from './filters'
import { renderEntriesList, renderEntry, generatePrompt, generateTextEditorDOM, generateEntryDOM, clearEntryDOM } from './views'
import { saveEntry, createEntry, getEntries } from './entries'

renderEntriesList()

document.querySelector('#generate-prompt').addEventListener('click', () =>{
	generatePrompt()
	clearEntryDOM()
})

document.querySelector('#search-text').addEventListener('input', (e) => {
	setFilters({
		searchText: e.target.value
	})
	renderEntriesList()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
	setFilters({
		sortBy: e.target.value
	})
	renderEntriesList()
})

document.querySelector('#start-timer').addEventListener('click', () => {
	generateTextEditorDOM()
})

document.querySelector('#entry-list__items').addEventListener('click', (e) => {
	renderEntry(e.target.id)
})

document.body.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    modal.style.display = "none";
   	modal.scrollTop = 0 
  }
})

document.querySelector('#modal-btn').addEventListener('click',(e) => {
	const modal = document.querySelector('#modal')
	const span = document.querySelector('#close')
	span.onclick = () =>  modal.style.display = "none"
	modal.style.display = "block"
	window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
   	modal.scrollTop = 0 
   }
 }
})



