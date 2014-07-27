var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.use(express.static(__dirname));

var waiting = [];
var num = 0;


io.on('connection', function(socket){

	console.log("A user has connected.");
	console.log("Searching for an opponent...");

	//Generate Unique id for the user.
	var userId = 'user#' + num++;
	
	var opponentId;

	//If no one is waiting, put the player in the waiting list.
	//Otherwise, grab someone whose waiting to play the player.
	if(typeof waiting[0] === 'undefined'){
		console.log("Waiting for an opponent...");
		waiting.push(socket);
	}
	else{
		console.log("Opponent found.");
		console.log("Starting game...");
		
		//Grab the other player.
		var otherPlayer = waiting.shift();
		opponentId = otherPlayer.Id;
		otherPlayer.emit("handshake", socket.id);
	}
		
	//Waiting client needs to receive opponent id.
	socket.on('handshake', function(opponent){
		opponentId = opponent;
	});
	
	//Send the move that was made, and tell the opponent it is their turn.
	socket.on('make move', function(board){
		socket.broadcast.to(opponentId).emit('your move', board);
	});
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});