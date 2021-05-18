let socket = io('/quiz');

// socket.on('PlayerLeft', msg => {
// 	alert('Player left');
// 	console.log('Client says hello there)', msg);

// 	let span = document.querySelector('h1');
// 	span.textContent = msg;
// });


socket.on('PlayerLeft', msg => {
	const span =document.createElement("span")
	span.style.display = 'block';
	span.textContent = msg;
	log.appendChild(span)
})