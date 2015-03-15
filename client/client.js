/**
 * [description]
 * @return {[type]} [description]
 */
(function(){

	var api = window.netflixController = {};
	var socket = io();
	var $body = $('body');

	$body.on('click', '[data-event]', function (e){
		e.preventDefault();
		socket.emit( e.target.getAttribute('data-event'), e.target.getAttribute('href') );
	});


	$('#search').on('submit', function (e) {
		e.preventDefault();
		socket.emit('search', e.target.searchField.value);
	});

}());