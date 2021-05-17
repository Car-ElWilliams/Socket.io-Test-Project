let socket = io();

socket.on('PlayerLeft', msg => {
	console.log('Player left');
	console.log('Client says hello there)', msg);
socket.on('newPlayer', player1 => {
	//Creates a list element of the first player
	let ul = document.querySelector('ul');
	let li = document.createElement('li');
	ul.appendChild(li);

	li.textContent = player1;

	let h1 = document.querySelector('h1');
	h1.textContent = 'You are ' + player1;
});

socket.on('newSpectator', spectator => {
	//Creates a list element of spectators
	let ul = document.querySelector('ul');
	let li = document.createElement('li');
	ul.appendChild(li);

	li.textContent = spectator;

	let h1 = document.querySelector('h1');
	h1.textContent = 'You are ' + spectator;
});

// socket.on('message', msg => {
// 	let span = document.querySelector('#player');
// 	span.textContent = msg;
// 	console.log(msg);
// });
