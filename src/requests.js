import moment from 'moment'

const getPrompt = async () => {
	const response = await fetch(`https://ineedaprompt.com/dictionary/default/prompt?q=noun`)
	if (response.status === 200) {
		const data = await response.json()
		return data.english
	} else {
			throw new Error('Unable to get prompt')
		}
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