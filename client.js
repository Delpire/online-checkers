socket.on('your move', function(newBoard) {
	board = newBoard;
	printBoard();
});