const express = require('express');
let app = express();
const http = require('http')
let server = http.createServer(app)
const io = require('socket.io')(server);
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

const port = process.env.PORT || 8080;



const users = [];

io.on('connection',function(socket){
    console.log('A user connected');
    socket.on('chatmessage',function (msg) {
        console.log('message is' + msg)
    });
});

server.listen(3000);

app.post('/postusername',function (req,res) {
    let username = req.body.username;
    let id = req.body.id;
    users.append({username:username,id: id})
});



app.listen(port, function() {
    console.log('Server listening.')
});






