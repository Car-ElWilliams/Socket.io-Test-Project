const path = require('path');

const express = require('express');
const app = express();

const http = require('http');
const httpServer = http.createServer(app);

// We tell the socket.io server with a http server, something express do for us normally in the background in the method app.listen()
const io = require('socket.io')(httpServer);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public', 'index.html'));
});

io.on('connect', socket => {
	console.log(`A client connected with ID: ${socket.id}`);

	socket.on('message', msg => {
		console.log(`client ${socket.id} says ${msg}`);
		socket.send('Message baby!');
		socket.emit('customEvent', 'Same as socket.send but I choose the name');

		//Listens after custom events set by socket.emit()
		//socket.on('customEvent', data => {
		//	console.log(data);
		//});
	});

	socket.on('disconnect', () => {
		console.log(`client${socket.id}`);
	});
});

// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
httpServer.listen(8000, () => {
	console.log('server listening at 8000');
});
