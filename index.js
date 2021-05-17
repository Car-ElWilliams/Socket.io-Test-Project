const path = require('path');

const express = require('express');
const app = express();

const http = require('http');
const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer);

const { default: axios } = require('axios');

async function getQuiz() {
	try {
		const response = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple');
		console.log(response.data);
	} catch (error) {
		console.error(error.message);
	}
}

console.log(getQuiz());

https: app.use(express.static(path.join(__dirname, 'public')));

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
		console.log(` A client ${socket.id} has left the website`);
	});
});

// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
httpServer.listen(8000, () => {
	console.log('server listening at 8000');
});
