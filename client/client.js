/**
 * [description]
 * @return {[type]} [description]
 */
(function(){
	// not currently in use
	var api = window.netflixController = {};
	var socket = api.socket = io();

	var lastTime = (new Date()).getTime();

	function reconnect() {
		socket = io({ forceNew: true });
	}

	var interval = setInterval(function() {
		var currentTime = (new Date()).getTime();
		if ( currentTime > (lastTime + 60000) ) {  // wait 1 minute
			alert('reconnecting');
			reconnect();
		}
	  lastTime = currentTime;
	}, 1000);

	// button events
	$('body').on('click', '[data-event]', function (e){
		e.preventDefault();
		socket.emit( e.target.getAttribute('data-event'), e.target.getAttribute('href') );
	});

	// search event
	$('#search').on('submit', function (e) {
		e.preventDefault();
		socket.emit('search', e.target.searchField.value);
		e.target.searchField.blur();
	});

}());