
var socket = chrome.sockets.tcpServer;

function createAndListen() {
  
  socket.create(null, function (info) {
    
    socket.listen( info.socketId, '127.0.0.1', 8889, null, function (result) {
      
      if ( result >= 0 ) {
        console.log('Socket listening. Result: ', result);
      } else {
        console.error('Socket failed to listen. Result: ', result);
      }
      
    });
  
  });

}

socket.onAccept.addListener( function (info) {
  console.log(info)
});

socket.onAcceptError.addListener( function (info) {
  console.error('Error accepting client connection', info)
});