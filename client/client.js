/**
 * [description]
 * @return {[type]} [description]
 */
;(function(){
	'use strict'

	var api = window.netflixController = {}
	var socket = api.socket = io()

	var lastTime = (new Date()).getTime()

	function reconnect() {
		socket = io({ forceNew: true })
	}

	setInterval(function() {
		var currentTime = (new Date()).getTime()
		// if the timeout is longer than 3000ms, the device has 
		// fallen asleep and woken up.
		if ( currentTime - lastTime >= 3000 ) {  
			reconnect()
		}
		lastTime = currentTime
  	}, 1000)

	// button events
	$('body').on('click', '[data-event]', function (e){
		e.preventDefault()
		socket.emit( e.target.getAttribute('data-event'), e.target.getAttribute('href') )
	})

	// search event
	$('#search').on('submit', function (e) {
		e.preventDefault()
		socket.emit('search', e.target.searchField.value)
		e.target.searchField.blur()
	})

}())