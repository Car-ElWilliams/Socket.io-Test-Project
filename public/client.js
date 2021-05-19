let socket = io('/quiz');

let currentRound = 0;

const OptionsChoice = document.getElementById('OptionsChoice');

function nextQuestion() {
	currentRound++;
	socket.emit('newQuestion', currentRound);
	console.log('current round', currentRound);

	//return currentRound;
	// for(let quizLoop = 0; quizLoop <= 4; quizLoop++) {
	// 	socket.emit('newQuestion', allAnswers[quizLoop]);
	// }
}

socket.on('startGame', quizData => {
	let quizQuestion = quizData.quizQuestion;
	let quizCorrectAnswer = quizData.quizCorrectAnswer;
	let quizIncorrectAnswers = quizData.quizIncorrectAnswers;
	let allOptions = quizData.allOptions;

	console.log(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers, allOptions);

	const quest = document.createElement('input')
	quest.type = 'button'
	quest.name="question"
	quest.id="myQuestion1" 
	quest.value= allOptions;
	quest.onClick="nextQuestion()"

	OptionsChoice.appendChild(quest);

	// question1 = document.querySelector('#myQuestion1').value = allOptions[0];
	// question2 = document.querySelector('#myQuestion2').value = allOptions[1];
	// question3 = document.querySelector('#myQuestion3').value = allOptions[2];
	// question4 = document.querySelector('#myQuestion4').value = allOptions[3];

	document.querySelector('h3').textContent = quizQuestion;
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

	document.querySelector('h3').textContent = quizQuestion;
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
