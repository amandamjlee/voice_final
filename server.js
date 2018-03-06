var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const say = require('say');




app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
	// We are given a websocket object in our function
	function (socket) {

		console.log("We have a new client: " + socket.id);

		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('chatmessage', function(data,voice,something) {
			// Data comes in as whatever was sent, including objects
			console.log("Received: 'chatmessage' " + data);

			// Send it to all of the clients
			socket.broadcast.emit('chatmessage', data);

      // command = "say -v " + voice + " ";
      // exec(command + something);


      say.speak(data);
		});



		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);


http.listen(3000, function(){
  console.log('listening on *:3000');
});
