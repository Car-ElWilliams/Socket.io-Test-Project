let socket = io('/quiz');
const log = document.getElementById('spectatorLog');
const headlog = document.getElementById('spectatorHeader');
const questContain = document.getElementById('questionContainer')
const ButtonForm = document.getElementById('myForm');


// Function to send back value to server
function nextQuestion(answer) {
	socket.emit('AnswerRespond', answer.value);
}
// Resulting to answer correct or wrong to spectator
socket.on('Resulting', resultQuest => {
	if (resultQuest[2] === true) {
		// Create element and add class
		let div = document.createElement('div');
		let spanHead = document.createElement('span');
		let spanAnswer = document.createElement('span');
		div.class = 'Resulting';

		// Adding string to element
		resultAnswer = ' ' + resultQuest[1] + ' (Correct!)';
		spanHead.innerHTML = resultQuest[0];
		spanAnswer.innerHTML = resultAnswer.bold();

		// Appendchild together creation of div
		log.appendChild(div);
		div.appendChild(spanHead);
		div.appendChild(spanAnswer);
	} else {
		// Create element and add class
		let div = document.createElement('div');
		let spanHead = document.createElement('span');
		let spanAnswer = document.createElement('span');
		div.class = 'Resulting';

		// Adding string to element
		resultAnswer = ' ' + resultQuest[1] + ' (Wrong!)';
		spanHead.innerHTML = resultQuest[0];
		spanAnswer.innerHTML = resultAnswer.bold();

		// Appendchild together creation of div
		log.appendChild(div);
		div.appendChild(spanHead);
		div.appendChild(spanAnswer);
	}
});

// Start or sending new question when rounds increase.
socket.on('startGame', quizData => {
	console.log('this is the data', quizData);

	let allOptions = quizData.allOptions;

	answer1 = document.querySelector('#myAnswer1').value = allOptions[0];
	answer2 = document.querySelector('#myAnswer2').value = allOptions[1];
	answer3 = document.querySelector('#myAnswer3').value = allOptions[2];
	answer4 = document.querySelector('#myAnswer4').value = allOptions[3];

	mainQuestion = document.getElementById('headerAll').textContent = quizData.quizQuestion;

});

// When first client connect and set ready as player for question
socket.on('newPlayer', player1 => {
	let h2 = document.createElement('h2');
	h2.innerHTML = 'Question:';
	h2.id = 'headerAll'
	document.getElementById('questionContainer').appendChild(h2);
});

// When late clients join and set them as spectator view
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
	span.innerHTML = 'You join spectator automatic for a reason max player is 1.';

	// Due button is already loaded in html, remove them.
	ButtonForm.remove();

	// appendChild together to div with id spectatorHeader already in HTML
	spectatorHeader.appendChild(h2);
	spectatorHeader.appendChild(span);
	// log.appendChild(resultQuest)
});

// When player successful answer all question. Game ended.
socket.on('GameComplete', result => {
	log.remove
	headlog.remove
	ButtonForm.remove

	End = document.getElementById('headerAll').textContent = 'Player has finish the question!'
	let h4 = document.createElement('h4')

	h4.innerHTML = 'Player has score ' + result[0] + '/' + result[1]

	questContain.appendChild(h4)

})

// When player left the lobby, send message to every active clients that game ended.
socket.on('playerLeft', spectator => {
	let GameEnd = document.createElement('h3');
	document.getElementById('SpecHead').innerHTML = 'The game as ended!';
	document.getElementById('SpecSpan').innerHTML = 'Game ended because player left the game!';
	GameEnd.innerHTML = 'Player has left the lobby.';
	log.appendChild(GameEnd);
	console.log('Player Left! Game End!');
});

