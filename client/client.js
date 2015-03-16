/**
 * [description]
 * @return {[type]} [description]
 */
(function(){
	// not currently in use
	var api = window.netflixController = {};

	// connect to current host
	var socket = io();

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