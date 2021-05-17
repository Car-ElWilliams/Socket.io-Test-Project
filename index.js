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
		console.log(response.data.results);
		return response.data.results[0].question;
	} catch (error) {
		console.error(error.message);
	}
}

console.log(getQuiz());

//Variables

let totalOnlineCount = 0;
let player = null;
let spectators = [];

// Express

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public', 'index.html'));
});

io.on('connect', socket => {
	let quizLobby = 'Player Lobby';
	socket.join(quizLobby);

	io.in(quizLobby);

	totalOnlineCount++;

	console.log(`totalOnlineCount = ${totalOnlineCount}`);

	if (totalOnlineCount === 1) {
		player = socket.id;
		console.log('New player ', socket.id);
		socket.emit('newPlayer', 'Player 1');
	} else {
		spectators.push(socket.id);
		socket.emit('newSpectator', 'Player ' + totalOnlineCount);

		//console.log(`Spectators = ${spectators}`);
		//console.log(`Player = ${player}`);
	}

	socket.on('disconnect', () => {
		console.log(`client has left ${socket.id}`);

		console.log(socket.id, player);
		if (socket.id === player) {
			socket.emit('player', 'Player left the game');
			player = null;
			totalOnlineCount--;
			console.log('The main player left', totalOnlineCount);
		} else {
			totalOnlineCount--;
			console.log('Total players:', totalOnlineCount);
		}
	});
});

httpServer.listen(8000, () => {
	console.log('server listening at 8000');
});

module.exports = getQuiz;
