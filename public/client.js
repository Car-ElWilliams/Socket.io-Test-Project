let socket = io('/quiz');

socket.on('PlayerLeft', msg => {
	console.log('Player left');
	console.log('Client says hello there)', msg)
});
socket.on('newPlayer', player1 => {
	let h1 = document.querySelector('h1');
	h1.textContent = 'Question:';
});

socket.on('newSpectator', spectator => {
	let h1 = document.querySelector('h1');
	h1.textContent = 'Question is';
});

// socket.on('message', msg => {
// 	let span = document.querySelector('#player');
// 	span.textContent = msg;
// 	console.log(msg);
// });
