var express = require('express');
var _ = require('lodash');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var os = require('os');
var ifaces = os.networkInterfaces();

var port = 8889;

var IP = _.chain(ifaces).values().flatten().filter( function (iface) {
        return (iface.family === 'IPv4' && iface.internal === false);
    }).pluck('address').first().value();

var events = [
    'action',
    'search',
    'navigate'
];

app.get('/', function(req, res){
    res.sendFile( __dirname + '/client/client.html' );
});

app.use(express.static('client'));

io.on('connection', function(socket){
    
    function forward(event, payload) {
        socket.broadcast.emit(event, payload);
    }
    // partially apply forward() handlers with events
    events.forEach(function(event){
        socket.on( event, forward.bind(this, event) );
    });
});

http.listen(port, function(){
    console.log('Listening on: ' + IP + ':' + port);
});