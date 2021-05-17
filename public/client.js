let socket = io();

socket.on('PlayerLeft', msg => {
	console.log('Player left');
	console.log('Client says hello there)', msg);

	let span = document.querySelector('h1');
	span.textContent = msg;
});
