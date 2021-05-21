const path = require('path');

const express = require('express');
const app = express();

const http = require('http');
const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer);

const { default: axios } = require('axios');
const { resourceUsage } = require('process');

//Variables
let player = null;
let spectators = [];
let quizCorrectAnswer = [];
let quizQuestion = '';
let currentRound = 0;
let correctTotal = 0;

// Async fuction to axios.get the quiz
async function getQuiz(round) {
	// let quizQuestion = '';
	let quizIncorrectAnswers = [];
	// let quizCorrectAnswer = [];
	let allOptions = [];

	try {
		const response = await axios.get(
			'https://opentdb.com/api.php?encode=url3986&amount=5&type=multiple',
			{
				params: { encode: 'url3986' },
			}
		);
		//console.log(response.data.results[currentRound]);

		// Quiz question, answer and incorrect answers
		quizQuestion = decodeURIComponent(response.data.results[round].question);
		quizCorrectAnswer = decodeURIComponent(response.data.results[round].correct_answer);
		quizIncorrectAnswers = decodeURIComponent(response.data.results[round].incorrect_answers);

		allOptions.push(quizIncorrectAnswers.split(','), quizCorrectAnswer);
		let flattenAllOptions = allOptions.flat();
		allOptions = flattenAllOptions;

		shuffleArray(allOptions);
		//console.log(
		//	'Question is:',
		//	quizQuestion,
		//	'Answer is:',
		//	quizCorrectAnswer,
		//	'incorrect answers are:',
		//	quizIncorrectAnswers,
		//	'All answers are',
		//	allOptions
		//);
		// console.log('from getQuiz', allOptions);
		return { quizQuestion, allOptions };
	} catch (error) {
		console.error(error.message);
	}
}

//Shuffle the order of the array
function shuffleArray(allOptions) {
	for (let i = allOptions.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = allOptions[i];
		allOptions[i] = allOptions[j];
		allOptions[j] = temp;
	}
	// console.log(allOptions);
}

// Express
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public', 'index.html'));
});

// Socket io with by clients connect to side /quiz
io.of('/quiz').on('connect', async socket => {
	let quizLobby = 'Player Lobby';
	socket.join(quizLobby);

	io.in(quizLobby);

	// Check if there is no client online, who ever enter first will be choosen as player
	if (player === null) {
		// Set clients id as player to remember send the right one
		player = socket.id;
		console.log(player)

		socket.emit('newPlayer', 'Player 1');
		console.log(`${socket.id} has been chosen to be as Player!`);
		console.log('On start game send: ', await getQuiz(currentRound));
		socket.emit('startGame', await getQuiz(currentRound));
	}
	// Else the rest late join will move to spectator.
	else {
		// Move client to room as Spectator and emit it to see spectator view
		spectators.push(socket.id);
		let SpectatorRoom = 'Spectator';
		socket.join(SpectatorRoom);

		socket.emit('newSpectator');
		console.log(`${socket.id} has been moved to Spectator. (Reason: Max player is 1)`);
	}

	// Respond and check if answer was correct, then send emit to update spectator view of resulting.
	socket.on('AnswerRespond', async answer => {
		console.log(player)
		console.log(answer);
		console.log(quizCorrectAnswer);


		// If answer is correct!
		if (answer === quizCorrectAnswer) {
			let resultQuest = [quizQuestion, answer, true];
			correctTotal++
			io.of('/quiz').in('Spectator').emit('Resulting', resultQuest);

			// Check if round amout is max
			// If max, stop the game and give result how many points player got.
			// Else, then keep 1up round and keep going until rounds is max
			if (currentRound === 4) {

				currentRound++
				let pointsResult = [correctTotal, currentRound]
				socket.emit('GameComplete', pointsResult)
				console.log('5 Done')

			} else {
				
				currentRound++;
				socket.emit('startGame', await getQuiz(currentRound));
				console.log(currentRound)
			}

			// Else if wrong...
		} else {
			let resultQuest = [quizQuestion, answer, false];
			io.of('/quiz').in('Spectator').emit('Resulting', resultQuest);
			console.log(currentRound);

			// Check if round amout is max
			// If max, stop the game and give result how many points player got.
			// Else, then keep 1up round and keep going until rounds is max
			if (currentRound === 4) {

				currentRound++
				let pointsResult = [correctTotal, currentRound]
				socket.emit('GameComplete', pointsResult)
				console.log('5 Done')

			} else {
				currentRound++;
				socket.emit('startGame', await getQuiz(currentRound));
				console.log(currentRound)
			}
		}
	});

	// When client disconnect
	socket.on('disconnect', socket => {
		console.log(socket.id);
		console.log(`client has left ${socket.id}`);

		// If choosen player left the lobby
		if (player === socket.id) {
			console.log(`Player ${socket.id} has left the lobby!`);
			io.of('/quiz').in('Spectator').emit('playerLeft');
			// Reset and who come first will be new choosen player
			player = null;

			// Else as if NOT player but as spectator
		} else {
			console.log(`A user ${socket.id} has left the lobby!`);
			spectators = spectators.filter(e => e !== socket.id);
		}
	});
});

httpServer.listen(8000, () => {
	console.log('server listening at 8000');
});

module.exports = getQuiz;
