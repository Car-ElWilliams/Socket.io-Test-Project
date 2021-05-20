let socket = io('/quiz');
const log = document.getElementById('questLog');

let currentRound = 0;
let correctAnswer;

function nextQuestion(e) {
	if (e === correctAnswer) {
		setTimeout(() => {
			currentRound++;
			socket.emit('newQuestion', currentRound);
			console.log('current round', currentRound);
		}, 3000);

		document.querySelector('h3 span').textContent = 'Your answer was correct!';
		document.querySelector('h3 span').style.color = 'green';
	} else {
		document.querySelector('h3 span').textContent = 'Incorrect! Right answer is ' + correctAnswer;
		document.querySelector('h3 span').style.color = 'red';
		setTimeout(() => {
			currentRound++;
			socket.emit('newQuestion', currentRound);
			console.log('current round', currentRound);
		}, 3000);
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
	// let h3 = document.createElement('h3');
	// h3.innerHTML = quizQuestion;
	// document.getElementById('questionContainer').appendChild(h3);

	correctAnswer = quizData.quizCorrectAnswer;
});

socket.on('newQuestionFromServer', quizData => {
	let quizQuestion = quizData.quizQuestion;
	let quizCorrectAnswer = quizData.quizCorrectAnswer;
	let quizIncorrectAnswers = quizData.quizIncorrectAnswers;
	let allOptions = quizData.allOptions;

	console.log(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers, allOptions);

	//All four answers
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

	//Reset answer
	document.querySelector('h3 span').textContent = '';

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
	let span = document.createElement('span');
	h2.innerHTML = 'Spectator';
	span.innerHTML = 'You are spectator reason max player is 1.'

	ButtonForm = document.getElementById('myForm')
	ButtonForm.style.display = 'none';

	document.getElementById('questionContainer').appendChild(h2);
	document.getElementById('questionContainer').appendChild(span);
});


socket.on('LogSpectator', spectator => {
	

	PlayerAnswer = quizData


})

// Testing of when Player left, issue is when it doesn't show for all spectators
socket.on('playerLeft', () => {
	let GameEnd = 'The Game as Ended! Player left.'
	document.querySelector
	console.log("Player Left! Game End!")
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
