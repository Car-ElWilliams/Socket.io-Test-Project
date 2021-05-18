let socket = io('/quiz');

socket.on('startGame', quizData => {
	let quizQuestion = quizData.quizQuestion;
	let quizCorrectAnswer = quizData.quizCorrectAnswer;
	let quizIncorrectAnswers = quizData.quizIncorrectAnswers;
	let allOptions = quizData.allOptions;

	console.log(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers, allOptions[0]);

	question1 = document.querySelector('#myQuestion1').value = allOptions[0];
	question2 = document.querySelector('#myQuestion2').value = allOptions[1];
	question3 = document.querySelector('#myQuestion3').value = allOptions[2];
	question4 = document.querySelector('#myQuestion4').value = allOptions[3];
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

// socket.on('message', msg => {
// 	let span = document.querySelector('#player');
// 	span.textContent = msg;
// 	console.log(msg);
// });
