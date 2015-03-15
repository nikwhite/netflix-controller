(function(){

	var searchFieldId = 'searchField';
	var searchClickId = 'searchTab';
	var $titles;

	var socket = io('127.0.0.1');

	function search(value) {
		document.location.pathname = '/search/' + window.encodeURIComponent(value);
	}

	function click(action) {
		var node = document.getElementsByClassName(action)[0];

		if (node) {
			node.click();
		}
	}

	function setTitles() {
		if (!$titles) {
			$titles = $('a.playHover, a.playLink');
		}
	}


	function eq(arr, index) {
		return (arr.length + (index % arr.length)) % arr.length;
	}

	function navigate(action) {
		console.log(action);
		setTitles();
		switch (action) {
			case 'tab': 
				console.log('index: '+$titles.index(document.activeElement));
				console.log(document.activeElement);
				$titles.eq( $titles.index(document.activeElement) + 1 )[0].focus();
				break;
			case 'shift-tab':
				$titles.eq( $titles.index(document.activeElement) - 1 )[0].focus();
				break;
			case 'select':
				console.log('selecting');
				document.activeElement.click();
				break;
		}
	}

	socket.on('action', click);

	socket.on('search', search);

	socket.on('navigate', navigate);

}());