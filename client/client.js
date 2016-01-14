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

	function fillSelect(select, data) {
		var $select = $(select);

		$select.find('option').remove().end();
		$(data).each(function() {
			var option = $('<option>');
			option.val(this.id).html(this.label);
			$select.append(option);
			if (this.selected) {
				$select.val(this.id);
			}
		});
	}

	function hideAll() {
		$('#search, #player, #browsing, #audio, #subtitles').hide();
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

	$(document).ready(function() {
		socket.emit('document:ready', {});
		hideAll();
	});

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

	socket.on('event:playing', function (argument) {
		hideAll();
		fillSelect($('#cmbAudio'), argument.audio);
		fillSelect($('#cmbSubtitles'), argument.subtitles);
		if (argument.audio.length > 0) {
			$('#audio').show();
		}
		if (argument.subtitles.length > 0) {
			$('#subtitles').show();
		}
		$('#player').show();
	});

	$('#cmbAudio, #cmbSubtitles').on('change', function(e) {
		e.preventDefault();
		socket.emit('language:change', $(this).val());
	});
}())
