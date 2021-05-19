let socket = io('/quiz');
const chatspace = document.getElementsByClassName('chatSpace');

let currentRound = 0;
let correctAnswer;

function nextQuestion(e) {
	if (e.value === correctAnswer) {
		setTimeout(() => {
			currentRound++;
			socket.emit('newQuestion', currentRound);
			console.log('current round', currentRound);
			document.querySelector('h3 span').textContent = '';
		}, 3000);

		document.querySelector('h3 span').textContent = 'Correct answer is ' + correctAnswer;
	}

	//return currentRound;
	// for(let quizLoop = 0; quizLoop <= 4; quizLoop++) {
	// 	socket.emit('newQuestion', allAnswers[quizLoop]);
	// }
}

function showCorrectAnswer() {
	if (nextQuestion('showAnswer') === correctAnswer) {
		console.log('hello');
	}
}

socket.on('startGame', quizData => {
	let quizQuestion = quizData.quizQuestion;
	let quizCorrectAnswer = quizData.quizCorrectAnswer;
	let quizIncorrectAnswers = quizData.quizIncorrectAnswers;
	let allOptions = quizData.allOptions;

	console.log(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers, allOptions);

	question1 = document.querySelector('#myQuestion1').value = allOptions[0];
	question2 = document.querySelector('#myQuestion2').value = allOptions[1];
	question3 = document.querySelector('#myQuestion3').value = allOptions[2];
	question4 = document.querySelector('#myQuestion4').value = allOptions[3];

	mainQuestion = document.querySelector('h2').textContent = quizData.quizQuestion;

	correctAnswer = quizData.quizCorrectAnswer;
});

socket.on('newQuestionFromServer', quizData => {
	let quizQuestion = quizData.quizQuestion;
	let quizCorrectAnswer = quizData.quizCorrectAnswer;
	let quizIncorrectAnswers = quizData.quizIncorrectAnswers;
	let allOptions = quizData.allOptions;

	console.log(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers, allOptions);

	question1 = document.querySelector('#myQuestion1').value = allOptions[0];
	question2 = document.querySelector('#myQuestion2').value = allOptions[1];
	question3 = document.querySelector('#myQuestion3').value = allOptions[2];
	question4 = document.querySelector('#myQuestion4').value = allOptions[3];

	mainQuestion = document.querySelector('h2').textContent = quizData.quizQuestion;

	correctAnswer = quizData.quizCorrectAnswer;
});

socket.on('PlayerLeft', msg => {
	console.log('Player left');
	console.log('Client says hello there)', msg);
});

socket.on('newPlayer', player1 => {
	let h1 = document.querySelector('h2');
	h1.textContent = 'Question:';
});

socket.on('newSpectator', spectator => {
	let h1 = document.querySelector('h2');
	h1.textContent = 'Question is';
});

// Testing of when Player left, issue is when it doesn't show for all spectators
socket.on('playerLeft', () => {
	GameEnd = `The game as ended!`;
	const reason = document.createElement('h4');
	reason.style.display = 'block';
	reason.innerHTML = 'Player has left the lobby :C';
	chatspace.appendChild(reason);
	document.querySelector('h3').textContent = GameEnd;
});

//socket.on('startGame', questions => {
//	let ul = document.getElementById('chatQuestion');
//	let li = document.createElement('li');
//	ul.appendChild(li);

//	li.textContent = questions;
//});

// socket.on('message', msg => {
// 	let span = document.querySelector('#player');
// 	span.textContent = msg;
// 	console.log(msg);
// });
