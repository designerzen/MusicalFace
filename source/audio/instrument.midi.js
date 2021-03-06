import {getBarProgress} from '../timing/timing'
export default class MIDIInstrument extends Instrument{

	constructor( channel="all" ){
		
		super()
		this.channel = channel
		this.sendMIDI = true
	}

	setMIDI(value){
		this.sendMIDI = value
	}

	noteOn(note){
		super.noteOn(note)
		// duration: 2000,
		// https://github.com/djipco/webmidi/blob/develop/src/Output.js
		//console.log("MIDI",amp, noteNumber, INSTRUMENT_NAMES.length, noteName, this.midiChannel)
		const midiOptions = { 
			channels:this.channel,
			attack:newVolume // amp
		}

		this.midi.playNote( noteName, midiOptions )
		
		// if (this.midiActive)
		// {
		// 	this.midi.setKeyAftertouch(noteName, (eyeDirection + 1 ) * 0.5 )
		// 	// this.midi.setPitchBend( eyeDirection )
		// }else{
		// 	this.midiActive = true
		// }
		
		//console.log(t, "MIDI noteOn", noteName, "Channel:"+this.midiChannel, { midiOptions, channel:this.midiChannel, hasMIDI:this.hasMIDI} )

		// Use eye direction as a modifier for the sound
		// if (eyeDirection !== 0)
		// {
		// 	// Midi pitch bending with eyes!
		// 	// Pitch bending eyes!
		// 	// 
		// 	// this.midi.setKeyAftertouch(noteName, (eyeDirection + 1 ) * 0.5 )
		// }
	}
	noteOff(){

		this.midi.sendClock( )
		this.midi.setSongPosition( getBarProgress() * 16383 )
		
		this.midi.stopNote(noteName, {
			// The velocity at which to release the note (between `0` * and `1`). If the `rawValue` option is `true`, the value should be specified as an integer
			// between `0` and `127`. An invalid velocity value will silently trigger the default of `0.5`.
			release:0.2
		})

		// immediate mute, but doesn't block (sounds better)
		this.midi.turnSoundOff()

		// fade out but prevents new notes...
		this.midi.turnNotesOff()
		
		// prevent flooding the off bus
		this.midiActive = false

		console.log(this.midi, "MIDI turnSoundOff", noteName, "Channel:"+this.midiChannel,{ channel:this.midiChannel, hasMIDI:this.hasMIDI, MIDIDeviceName:this.MIDIDeviceName} )
	}
}

// incoming MIDI
const h = function(event){

	function MIDIMessage (event){
		this._event = event;
		this._data = event.data;
		this.receivedTime = event.receivedTime;

		if (this._data && this._data.length < 2){
			console.warn("Illegal MIDI message of length", this._data.length);
			return;
		}

		this._messageCode = event.data[0] & 0xf0;
		this.channel = (event.data[0] & 0x0f)+1;

		switch(this._messageCode){

			// Note Off
			case 0x80:
				this.messageType = "noteoff";
				this.key = event.data[1] & 0x7F;
				this.velocity = event.data[2] & 0x7F;
			break;

			// Note On
			case 0x90:
				this.messageType = "noteon";
				this.key = event.data[1] & 0x7F;
				this.velocity = event.data[2] & 0x7F;
			break;

			// Polyphonic Key Pressure
			case 0xA0:
				this.messageType = "keypressure";
				this.key = event.data[1] & 0x7F;
				this.pressure = event.data[2] & 0x7F;
			break;

			// Control Change
			case 0xB0:
				this.messageType = "controlchange";
				this.controllerNumber = event.data[1] & 0x7F;
				this.controllerValue = event.data[2] & 0x7F;

				if (this.controllerNumber === 120 && this.controllerValue === 0){
					this.channelModeMessage = "allsoundoff";
				}
				else if (this.controllerNumber === 121){
					this.channelModeMessage = "resetallcontrollers";
				}
				else if (this.controllerNumber === 122){
					if (this.controllerValue === 0){
						this.channelModeMessage =  "localcontroloff";
					}else{
						this.channelModeMessage =  "localcontrolon";
					}
				}
				else if (this.controllerNumber === 123 && this.controllerValue === 0){
					this.channelModeMessage = "allnotesoff";
				}
				else if (this.controllerNumber === 124 && this.controllerValue === 0){
					this.channelModeMessage = "omnimodeoff";
				}
				else if (this.controllerNumber === 125 && this.controllerValue === 0){
					this.channelModeMessage = "omnimodeon";
				}
				else if (this.controllerNumber === 126){
					this.channelModeMessage = "monomodeon";
				}
				else if (this.controllerNumber === 127){
					this.channelModeMessage = "polymodeon";
				}
			break;

			// Program Change
			case 0xC0:
				this.messageType = "programchange";
				this.program = event.data[1];
			break;

			// Channel Pressure
			case 0xD0:
				this.messageType = "channelpressure";
				this.pressure = event.data[1] & 0x7F;
			break;

			// Pitch Bend Change
			case 0xE0:
				this.messageType = "pitchbendchange";
				var msb = event.data[2] & 0x7F;
				var lsb = event.data[1] & 0x7F;
				this.pitchBend = (msb << 7) + lsb;
			break;
		}
	}

	return new MIDIMessage(event);
}