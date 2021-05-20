let socket = io('/quiz');
const log = document.getElementById('spectatorLog');
const headlog = document.getElementById('spectatorHeader')


let correctAnswer;


// function nextQuestion(e) {
// 	if (e === correctAnswer) {
// 		setTimeout(() => {
// 			currentRound++;
// 			socket.emit('newQuestion', currentRound);
// 			console.log('current round', currentRound);
// 		}, 3000);

// 		document.querySelector('h3 span').textContent = 'Your answer was correct!';
// 		document.querySelector('h3 span').style.color = 'green';
// 	} else {
// 		document.querySelector('h3 span').textContent = 'Incorrect! Right answer is ' + correctAnswer;
// 		document.querySelector('h3 span').style.color = 'red';
// 		setTimeout(() => {
// 			currentRound++;
// 			socket.emit('newQuestion', currentRound);
// 			console.log('current round', currentRound);
// 		}, 3000);
// 	}

	//return currentRound;
	// for(let quizLoop = 0; quizLoop <= 4; quizLoop++) {
	// 	socket.emit('newQuestion', allAnswers[quizLoop]);
	// }


// function showCorrectAnswer() {
// 	if (nextQuestion('showAnswer') === correctAnswer) {
// 		console.log('hello');
// 	}
// }



// Function to send back value to server
function nextQuestion(answer) {
	socket.emit('AnswerRespond', answer.value)
}
// Resulting to answer correct or wrong to spectator
socket.on('Resulting', resultQuest => {

		if (resultQuest[2] === true){
			
			// Create element and add class
			let div = document.createElement('div')
			let spanHead = document.createElement('span')
			let spanAnswer = document.createElement('span')
			div.class = 'Resulting';

			// Adding string to element
			resultAnswer = resultQuest[1] + '(Correct!)'
			spanHead.innerHTML = resultQuest[0];
			spanAnswer.innerHTML = resultAnswer

			// Appendchild together creation of div
			log.appendChild(div)
			div.appendChild(spanHead)
			div.appendChild(spanAnswer)
			
		}else{

			// Create element and add class
			let div = document.createElement('div')
			let spanHead = document.createElement('span')
			let spanAnswer = document.createElement('span')
			div.class = 'Resulting';

			// Adding string to element
			resultAnswer = resultQuest[1] + '(Wrong!)'
			spanHead.innerHTML = resultQuest[0];
			spanAnswer.innerHTML = resultAnswer

			// Appendchild together creation of div
			log.appendChild(div)
			div.appendChild(spanHead)
			div.appendChild(spanAnswer)
		}
})


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
	// Create elements
	let h2 = document.createElement('h2');
	let span = document.createElement('span');
	let resultQuest = document.createElement('div');

	// Add id for them to use replace string later on
	resultQuest.id = 'resultQuest';
	h2.id = 'SpecHead';
	span.id = 'SpecSpan';

	// Add string contain in element
	h2.innerHTML = 'You are a Spectator';
	span.innerHTML = 'You join spectator automatic for a reason max player is 1.'

	// Due button is already loaded in html, remove them.
	ButtonForm = document.getElementById('myForm')
	ButtonForm.remove();

	// appendChild together to div with id spectatorHeader already in HTML
	spectatorHeader.appendChild(h2);
	spectatorHeader.appendChild(span);
	// log.appendChild(resultQuest)
});

// Progress to send span spectators view of quest and player's answer
socket.on('LogSpectator', spectator => {
	

	PlayerAnswer = quizData

})

// TWhen player left the lobby, send message to every active clients that game ended.
socket.on('playerLeft', spectator => {
	let GameEnd = document.createElement('h3')
	document.getElementById('SpecHead').innerHTML = 'The game as ended!'
	document.getElementById('SpecSpan').innerHTML = 'Game ended because player left the game!'
	GameEnd.innerHTML = 'Player has left the lobby.'
	log.appendChild(GameEnd)
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
