var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8080;
var users = [];
var messages = [{message: "Cześć", from: 'burak'},
                {message: "no Cześć", from: 'nieswiadoma'},
                {message: "hejka", from: 'burak'},
                {message: "poklikamy?", from: 'mały'},
                {message: "chyba nie", from: 'burak'},
                {message: "a gdzie mieszkasz?", from: 'nieswiadomy'},
                {message: "asdfasdf", from: 'burak'},
                {message: "xcvbxvc", from: 'burak'},
                {message: "rwetwer", from: 'burak'},
                {message: "2341234", from: 'burak'}];

app.use(express.static(path.join(__dirname, "public")));

io.on('connection', function(socket) {
  console.log('New connection made');


  socket.on('get-messages', function(data){
    if(users = []){
      messages.sort(function (a, b) {return Math.random() - 0.5;});
      socket.emit('all-messages',messages)
    }
  });

  // Show all users when first logged on
  socket.on('get-users', function(data) {
    socket.emit('all-users', users);
  });

  // When new socket joins
  socket.on('join', function(data) {
    socket.nickname = data.nickname;
    users[socket.nickname] = socket; 
    var userObj = {
      nickname: data.nickname,
      socketid: socket.id
    }
    users.push(userObj);
    io.emit('all-users', users);
  });

  // Send a message
  socket.on('send-message', function(data) {
    // socket.broadcast.emit('message-received', data);
    io.emit('message-received', data);
  });


  socket.on('disconnect', function() {
    users = users.filter(function(item) {
      return item.nickname !== socket.nickname;
    });
    io.emit('all-users', users);
  });

});

server.listen(port, function() {
  console.log("Listening on port " + port);
});
