(function(){

	var searchFieldId = 'searchField';
	var searchClickId = 'searchTab';
	var $titles;

	var socket = io('127.0.0.1:8889');

	function checkTrackSettings()
	{
		var div = $('#player-menu-track-settings');
		var audioLi = div.find('ol.player-audio-tracks li');
		var subtitlesLi = div.find('ol.player-timed-text-tracks li');

		if (div && (audioLi.length > 0 || subtitlesLi.length > 0)) {
			// Agrego listeners
			$('ol.player-audio-tracks li, ol.player-timed-text-tracks li').on('click', function() {
				setTimeout( checkTrackSettings, 100 );
			});
			// Parseo los datos y los envío al cliente
			var audio = audioLi.map(function() {
				$this = $(this);
				return {
					id: $this.data('id'),
					label: $this.html(),
					selected: $this.hasClass('player-track-selected')
				};
			}).toArray();

			var subtitles = subtitlesLi.map(function() {
				$this = $(this);
				return {
					id: $this.data('id'),
					label: $this.html(),
					selected: $this.hasClass('player-track-selected')
				};
			}).toArray();

			socket.emit('event:playing', {
				audio: audio,
				subtitles: subtitles
			});
		} else {
			setTimeout( checkTrackSettings, 100 );
		}
	}

	function languageChange(argument) {
		var item = $('[data-id="' + argument + '"]');
		item.click();
		item.blur();
	}

	function search(value) {
		document.location.pathname = '/search/' + window.encodeURIComponent(value);
	}

	function click(action) {
		var node = document.getElementsByClassName(action)[0];

		if (node) {
			node.click();
		}
	}

	// positive modulo for out-of-bounds array access
	function modulo(arr, index) {
		return (arr.length + (index % arr.length)) % arr.length;
	}

	function active() {
		return document.activeElement;
	}

	function ffw() {

	}

	function navigate(action) {

		if (!$titles) {
			$titles = $('a.playHover, a.playLink');
		}

		switch (action) {
			case 'tab':
				$titles.eq( modulo( $titles, $titles.index(active()) + 1 ) ).focus();
				break;

			case 'shift-tab':
				$titles.eq( modulo( $titles, $titles.index(active()) - 1 ) ).focus();
				break;

			case 'select':
				active().click();
				break;
		}
	}

	socket.on('action', click);
	socket.on('search', search);
	socket.on('navigate', navigate);
	socket.on('document:ready', checkTrackSettings);
	socket.on('language:change', languageChange);

	$(document).ready(function(){
		checkTrackSettings();
	});

}());
