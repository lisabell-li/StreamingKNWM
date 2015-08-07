/*
 * Livestream mit WebRTC
 */
if( process.argv.length < 3 ) {
	process.exit();
}

var PASSWORT = process.argv[2];
var	PORT = process.argv[3] || 8081;//Default Streaming Port 8081
var	PORT_WEBSOCKET = process.argv[4] || 8083;  //Default Websocket Port 8083
var	EXTRA = 'lisa'; // 4 Bytes extra Wort

var width = 320,
	height = 240;

// Hier wird der Websocket Server erstellt
var server1 = new (require('ws').Server)({port: PORT_WEBSOCKET});
server1.on('connection', function(socket) {
	var streamAnfang = new Buffer(8);
	streamAnfang.write(EXTRA);
	streamAnfang.writeUInt16BE(width, 4);
	streamAnfang.writeUInt16BE(height, 6);
	socket.send(streamAnfang, {binary:true});

	console.log( 'Neue WebSocket Verbindung ('+server1.clients.length+' total)' );
	
	socket.on('close', function(code, message){
		console.log( ' WebSocket unterbrochen ('+server1.clients.length+' total)' );
	});
});
//Broadcasten der Daten an alle beteiligten Clients welche empfangen
server1.broadcast = function(data, otions) {
	for( var x in this.clients ) {
		if (this.clients[x].readyState == 1) {
			this.clients[x].send(data, otions);
		}
		else {
			console.log( 'Fehler: Der Client ('+x+') ist nicht verbunden.' );
		}
	}
};


// Hier wird ein HTTP Server erstellt der einen einkommenen MPEG Stream akzeptiert (wenn das Passwort stimmt)
var streamServer = require('http').createServer( function(request, response) {
	//alle Parameter
	var params = request.url.substr(1).split('/');
	//wenn das Passwort richtig ist
	if( params[0] == PASSWORT ) {
		//setze höhe und breite anhand der parameter oder nehme default variablen
		width = (params[1] || 360)|0;
		height = (params[2] || 240)|0;
		
		console.log(
			'Stream Connected: ' + request.socket.remoteAddress + 
			':' + request.socket.remotePort + ' size: ' + width + 'x' + height
		);
		//Broadcast der Daten
		request.on('data', function(data){
			server1.broadcast(data, {binary:true});
		});
	}
	//wenn das Passwort nicht richtig ist
	else {
		console.log(
			'Verbindung zum Stream unterbrochen: '+ request.socket.remoteAddress + 
			request.socket.remotePort + ' - falsches Passwort.'
		);
		response.end();
	}
}).listen(PORT);

console.log('Wartet auf MPEG Stream auf http://127.0.0.1:'+PORT+'/<secret>/<width>/<height>');
console.log('Wartet auf WebSocket Verbindung auf ws://127.0.0.1:'+PORT_WEBSOCKET+'/');