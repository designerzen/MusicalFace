import {INSTRUMENT_NAMES, INSTRUMENT_FOLDERS} from '../audio/instruments'
import {canFullscreen, exitFullscreen,goFullscreen,toggleFullScreen} from './full-screen'
import {getShareLink,loadSoloMode,loadDuetMode} from '../location-handler'
import {formattedDate} from '../models/info'
import {setButton} from './button'
import {setToggle} from './toggle'
import { connectSelect } from './select'

const doc = document
// const { getElementById, querySelector } = document
let buttonInstrument
let buttonRecord

export let buttonQuantise
export let buttonVideo
export let controls

const main = doc.querySelector("main")
	
export const toggleVisibility = element => {
	const isVisisble = element.style.visibility !== "hidden"
	element.style.visibility = !isVisisble ? "visible" : "hidden"
	return !isVisisble
}

export const video = doc.querySelector("video")
export const isVideoVisible = () => video.style.visibility === "hidden" 
export const toggleVideoVisiblity = value => {
	const currentlyVisible = isVideoVisible()
	console.error("toggling video vis", {value, currentlyVisible})
	video.style.visibility = currentlyVisible ? "visible" : "hidden", !currentlyVisible 
}

export const setControls = fragment => {
	
	const personControl = doc.getElementById('person-a-controls')

	// add to dom or replace existing????
	personControl.appendChild( fragment )

	// bind mouse events here???
}

export const setupCameraForm = (cameras, callback) => {
	
	const cameraForm = doc.getElementById("camera")
	const select = cameraForm.querySelector('#camera select')

	// loop through cameras and add to list
	const optionElements = cameras.map( (camera, index) => `<option value="${camera.deviceId}">${camera.label}</option>` )
			
	// we only inject into the select field
	select.innerHTML = `<optgroup label="Detected Cameras">${optionElements.join('')}</optgroup>`
	connectSelect( select, callback )
}

// Setup the instrument list - connect to callback?
export const setupInstrumentForm = callback => {
	
	// populate ui	
	const uiOptions = INSTRUMENT_FOLDERS.map( (folder, index) => `<label for="${folder}">${INSTRUMENT_NAMES[index]}<input id="${folder}" name="instrument-selector" type="radio" value="${folder}"></input></label>` ) 
	
	uiOptions.unshift("<legend>Select an instrument</legend>")

	// bind mouse events too???

	// const uiOptions = INSTRUMENT_FOLDERS.map( folder => `<option value="${folder}">${folder}</option>` ) 
	return `${uiOptions.join('')}`
}


export const updateTempo = tempo =>{
	const b = doc.getElementById('input-tempo')
	if (b)
	{
		b.setAttribute("value", tempo)
	}
	console.log("Setting tempo", tempo)
}



////////////////////////////////////////////////////////////////////
// This is the 2nd screen, just after loading
// returns a true or false for if the user hit duet
////////////////////////////////////////////////////////////////////
export const showPlayerSelector = (options) => new Promise( (resolve,reject)=>{

	const CSS_CLASS = "player-selection"
	const form = doc.getElementById("onboard")
	const panel = doc.getElementById("player-selector")
	const solo = panel.querySelector("#button-solo")
	const duet = panel.querySelector("#button-duet")
	const trio = panel.querySelector("#button-trio")
	const start =  doc.getElementById("button-start")
	const advanced = panel.querySelector("#toggle-advanced-mode")

	// FIXME!
	let advancedMode = options.advancedMode || false
	let players = options.duet ? 2 : 1

	// set the query to this stae
	advanced.setAttribute( "checked", !advancedMode )
	
	doc.documentElement.classList.toggle(CSS_CLASS, true)

	const complete = result => {
		
		// if we are in solo mode
		if (result < 2)
		{
			solo.classList.toggle( "hide", true)
			duet.classList.toggle( "hide", false)
			
			main.classList.add("solo")
		
		}else{
			
			duet.classList.toggle( "hide", true)
			solo.classList.toggle( "hide", false)
			
			main.classList.add("duet")
		}

		// start the animation out.
		// NB. This is not superflous as the camera
		// takes a broze age to load into memory
		panel.classList.add("completed")
		doc.documentElement.classList.toggle(CSS_CLASS, true)
			
		// wait for animation to complete
		setTimeout( ()=> {
			//console.log({advancedMode})
			doc.documentElement.classList.toggle('advanced', advancedMode)
			doc.documentElement.classList.toggle(CSS_CLASS, false)
			panel.classList.remove("completed")
		}, 45 )
		
		resolve({
			players:result,
			advancedMode
		})
	}

	const setPlayers = amount => {
		players = amount
		doc.documentElement.classList.remove("solo", "duet")
		doc.documentElement.classList.add( players === 1 ? "solo" : "duet")
	}

	solo.addEventListener("click", event => setPlayers(1) )
	duet.addEventListener("click", event => setPlayers(2) )
	trio.addEventListener("click", event => setPlayers(3) )

	advanced.addEventListener("change", event =>{ 
		advancedMode = !advancedMode 
		main.classList.toggle("beginner", !advancedMode)
	})
	
	// start.addEventListener("click", event => {
	// 	event.preventDefault()
	// 	complete(players)
	// 	return false
	// } , true )
	
	form.addEventListener("submit", (event) => {
		event.preventDefault()
		complete(players)
		return false
	}, true)

	// set defaults
	main.classList.toggle("beginner", !advancedMode)
	setPlayers(players)
	panel.focus()
})


// DOM elements
export const setupInterface = ( options ) => {
	const h1 = doc.querySelector("h1")
	
	const buttonShare = doc.getElementById("share")
	const buttonSolo = doc.getElementById("button-solo")
	const buttonDuet = doc.getElementById("button-duet")
	const title = doc.getElementById("title")
	
	const shareElement = doc.querySelector("share-menu")
	shareElement.url = getShareLink( options )
	buttonShare.addEventListener('mousedown', e => {
		
		shareElement.setAttribute( "url", getShareLink( options ) )
		console.error("SHARING", {shareElement, url:shareElement.url  } )
	}, false)
	
	controls = doc.getElementById("controls")

	buttonInstrument = doc.getElementById("button-instrument")
	buttonVideo = doc.getElementById("button-video")
	buttonRecord = doc.getElementById("button-record")
	buttonQuantise = doc.getElementById("button-quantise")
	//buttonPhotograph = doc.getElementById("button-photograph")
	
	if ( canFullscreen() )
	{
		//also pass this inott a flip flopper
		const buttonFullscreen = setToggle( "button-fullscreen", status =>{
			options.fullscreen = toggleFullScreen()
			buttonFullscreen.classList.toggle("fs", options.fullscreen)
			//console.log("fullscreen", options.fullscreen)
			//setToast("Metronome " + (ui.metronome ? 'enabled' : 'disabled')  )
		}, false )
	
	}else{
		// no full screen mode available so hide the full screen button
		doc.getElementById( "button-fullscreen").classList.toggle("hide", true)
	}

	// if (options.duet){
	// 	h1.innerHTML += ":DUET"
	// }
	
	// title.innerHTML = "The InterFACE is ready, open your mouth to begin"
	// Show the release date on the UI somewhere...
	const versionElement = doc.getElementById("version")
	const currentVersion = versionElement.innerHTML
	versionElement.innerHTML = `${currentVersion} <span id="release">${formattedDate}</span>`
	
	// console.log(`InterFACE ${currentVersion} build date : ${formattedDate} `, {DATE, releaseDate})
	// buttonSolo.addEventListener( "click", event => loadDuetMode, false)
	// buttonDuet.addEventListener( "click", event => loadSoloMode, false)

	// prevent the form from changing the url	
	controls.addEventListener("submit", (event) => {
		event.preventDefault()
		// removes the ?
        //window.history.back()
	}, true)
}

////////////////////////////////////////////////////////////////////
// For accessibility, once the app has loaded we try and put the
// user in the right place so that they can begin
////////////////////////////////////////////////////////////////////
export const focusApp = ()=>{ 
	
}
