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

	answer1 = document.querySelector('#myAnswer1').value = allOptions[0];
	answer2 = document.querySelector('#myAnswer2').value = allOptions[1];
	answer3 = document.querySelector('#myAnswer3').value = allOptions[2];
	answer4 = document.querySelector('#myAnswer4').value = allOptions[3];

	console.log(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers, allOptions);

	mainQuestion = document.querySelector('h2').textContent = quizData.quizQuestion;

	// Lists all the questions
	let h3 = document.createElement('h3');
	h3.innerHTML = headQuiz;
	document.getElementById('questionContainer').appendChild(h3);

	correctAnswer = quizData.quizCorrectAnswer;
});

socket.on('newQuestionFromServer', quizData => {
	let quizQuestion = quizData.quizQuestion;
	let quizCorrectAnswer = quizData.quizCorrectAnswer;
	let quizIncorrectAnswers = quizData.quizIncorrectAnswers;
	let allOptions = quizData.allOptions;

	console.log(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers, allOptions);

	answer1 = document.querySelector('#myAnswer1').value = allOptions[0];
	answer2 = document.querySelector('#myAnswer2').value = allOptions[1];
	answer3 = document.querySelector('#myAnswer3').value = allOptions[2];
	answer4 = document.querySelector('#myAnswer4').value = allOptions[3];
	
	// Define and replace if missing like ", ', 's and more depens what missing
	if (quizQuestion.includes('&quot;') === true & (quizQuestion.includes('&#039;s') === true)){
		headQuiz2 = quizQuestion.replaceAll('&#039;s', "'s")
		headQuiz = headQuiz2.replaceAll('&quot;', '"');
	}
	else if (quizQuestion.includes('&quot;') === true){
		headQuiz = quizQuestion.replaceAll('&quot;', '"');
	}
	else if (quizQuestion.includes('&#039') === true){
		headQuiz = quizQuestion.replaceAll('&#039;', "'");
	}
	else if (quizQuestion.includes('&shy;') === true){
		headQuiz = quizQuestion.replaceAll('&shy;', "-")
	}
	else if (quizQuestion.includes('&#039;s')){
		headQuiz = quizQuestion.replaceAll('&#039;s', "'s")
	}
	else if (quizQuestion.includes('&deg;') === true){
		headQuiz = quizQuestion.replaceAll('&deg;', "°")
	}
	else {
		headQuiz = quizQuestion
	}

	let h3 = document.createElement('h3');
	h3.innerHTML = headQuiz;
	document.getElementById('questionContainer').appendChild(h3);
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
	let h2 = document.createElement('h2');
	h2.innerHTML = 'Question:';
	document.getElementById('questionContainer').appendChild(h2);
});

socket.on('newSpectator', spectator => {
	let h2 = document.createElement('h2');
	h2.innerHTML = 'Question:';
	document.getElementById('questionContainer').appendChild(h2);
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
