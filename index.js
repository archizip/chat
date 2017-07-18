var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    var userNickname = '';

    socket.emit('show modal');

    socket.broadcast.emit('hi');

    socket.on('save nickname', function (nickname) {
        userNickname = nickname;
        socket.emit('show modal');
    });

    socket.on('chat message', function(data){
        data.nickname = userNickname;
        io.emit('chat message', data);
    });

    socket.on('disconnect', function(){
        io.emit('bye');
    });

    socket.on('user typing', function(){
        socket.broadcast.emit('user typing', userNickname);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
