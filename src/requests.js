import { getNoun } from './nouns'
import { getAdjective } from './adjectives'

const getPrompt = () => {
	return `${getAdjective()} ${getNoun()}`
}

const getCountdownTimer = (duration, display) => new Promise((resolve, reject)=> {
  	let timer = duration
    let minutes
    let seconds
    setInterval(() => {
    	
	    minutes = parseInt(timer / 60, 10)
	    seconds = parseInt(timer % 60, 10)

	    minutes = minutes < 10 ? `0${minutes}` : minutes
	    seconds = seconds < 10 ? `0${seconds}` : seconds

	    display.textContent = `${minutes}:${seconds}`

	    timer > 10 ? display.style.color = 'white' : display.style.color = 'red' 

	    timer > 0 ? --timer : resolve(clearInterval())
	    }, 1000)
    })

export { getPrompt, getCountdownTimer }