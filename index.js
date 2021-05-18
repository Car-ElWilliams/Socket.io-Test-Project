const path = require('path');

const express = require('express');
const app = express();

const http = require('http');
const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer);

const { default: axios } = require('axios');

async function getQuiz() {
	let questions = [];
	let correctAnswer = '';
	let incorrectAnswers = '';
	let allAnswers = '';

	try {
		const response = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple');
		console.log(response.data.results);
		questions = response.data.results[0].question;
		correctAnswer = response.data.results[0].correct_answer;
		incorrectAnswers = response.data.results[0].incorrect_answer;
		allAnswers = concat(correctAnswer, incorrectAnswers);
		return [questions, correctAnswer, allAnswers, incorrectAnswers];
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

io.of('/quiz').on('connect', socket => {
	let quizLobby = 'Player Lobby';
	socket.join(quizLobby);

	io.in(quizLobby);
	console.log(`totalOnlineCount = ${totalOnlineCount}`);

	if (totalOnlineCount === 0){
		totalOnlineCount++
		player = socket.id
			socket.emit('newPlayer', 'Player 1');
		console.log(`${socket.id} has been chosen to be as Player!`)


		document.getElementById("myForm").addEventListener("submit", nextQuestion);

		function nextQuestion() {
			socket.emit('newQuestion', questions[quesLoop]);
			// for(let quizLoop = 0; quizLoop <= 4; quizLoop++) {
			// 	socket.emit('newQuestion', allAnswers[quizLoop]);
			// }			
		}
  	}
  	else{
		totalOnlineCount++
		spectators.push(socket.id);
			socket.emit('newSpectator', 'Player ' + totalOnlineCount);
		console.log(`${socket.id} has been moved to Spectator. (Reason: Max player is 1)`)
  	}

	socket.on('disconnect', () => {
		console.log(`client has left ${socket.id}`);

    if (player === socket.id){
		console.log(`Player ${socket.id} has left the lobby!`)
		player = null
		totalOnlineCount--
    }else{
		console.log(`A user ${socket.id} has left the lobby!`)
		spectators = spectators.filter(e => e !== socket.id);
			// console.log(spectators) Check array if successful remove correct socket.id
		totalOnlineCount--
    }

	});
});

httpServer.listen(8000, () => {
	console.log('server listening at 8000');
});

module.exports = getQuiz;
