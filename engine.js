//Prints out the board. 0 is an empty space. 1 is player one. 2 is player two.
function printBoard(){

	checkerBoardDiv = document.getElementById("checkerBoardDiv");

	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
		checkerBoardDiv.innerHTML = checkerBoardDiv.innerHTML + board[i][j] + " ";
		}
		checkerBoardDiv.innerHTML = checkerBoardDiv.innerHTML + "<br>";
	}
}

//Checks if the move is valid.
function checkMove(curX, curY, nextX, nextY){

	//If the move is off the board return.
	if(nextX < 0 || nextX > 7 || nextY < 0 || nextY > 7)
		return;

	//If the current position does not contain a piece, return.
	if(board[curX][curY] === 0)
		return;
		
	//If the next position contains a piece, return.
	if(board[nextX][nextY] !== 0)
		return;

	//If the next position is the current position, return.
	if(curX == nextX || curY === nextY)
		return;
	
	//If the move is more that one or two positions away diagonally, return.
	if(Math.abs(curX - nextX) > 2 || Math.abs(curY - nextY) > 2)
		return;
	
	var player = board[curX][curY];
	
	//If the player is player 1 (top side) and the next position is moving backwards, return.
	if(player === 1 && (nextX - curX) < 1)
		return;
		
	//If the player is player 2 (bottom side) and the next position is moving backwards, return.
	if(player === 2 && (nextX - curX) > 1)
		return;	
	
	//If the move is one position away, move there and return.
	if(Math.abs(curX - nextX) === 1){
		makeMove(curX, curY, nextX, nextY);
		return;
	}
	
	//Check to see who which player wishes to move. Used to determine whether they are moving
	//up or down the board.
	if(player === 1){
	
		//Determine whether to add or subtract 1 to the y-coordinate to check jumped piece.
		//If there is not a piece there, return.
		var jumpedYCoordinate = (nextY - curY) * 0.5
		if(board[nextX - 1][nextY - jumpedYCoordinate] !== 2)
			return
		
		//Remove the jumped piece.
		board[nextX - 1][nextY - jumpedYCoordinate] = 0;
		
		makeMove(curX, curY, nextX, nextY);
			
	}
	
	//Check to see who which player wishes to move. Used to determine whether they are moving
	//up or down the board.
	if(player === 2){
	
		//Determine whether to add or subtract 1 to the y-coordinate to check jumped piece.
		//If there is not a piece there, return.
		var jumpedYCoordinate = (nextY - curY) * 0.5
		if(board[nextX + 1][nextY - jumpedYCoordinate] !== 1)
			return
		
		//Remove the jumped piece.
		board[nextX + 1][nextY - jumpedYCoordinate] = 0;
		
		makeMove(curX, curY, nextX, nextY);
			
	}
	
}

//Moves the piece from the current position to the next position.
function makeMove(curX, curY, nextX, nextY){
	var player = board[curX][curY];
	board[curX][curY] = 0;
	board[nextX][nextY] = player;
}