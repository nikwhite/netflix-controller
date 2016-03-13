(function(){

	var searchFieldId = 'searchField';
	var searchClickId = 'searchTab';
	var $titles;

	// var socket = io('127.0.0.1:8889');

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

	// socket.on('action', click);
	// socket.on('search', search);
	// socket.on('navigate', navigate);


}());