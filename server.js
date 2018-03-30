let express = require('express');
let bodyParser = require('body-parser');
let app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(8080, function(){
    console.log('listening on *:3000');
})
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

app.use(bodyParser());

const port = process.env.PORT || 8080;



const users = [];

io.on('connection',function(socket){
    console.log('A user connected');
    socket.on('chatmessage',function (msg, username) {
        io.emit('chatmessage',msg , username)
        });
});

app.get('/',function (req,res) {
    res.sendFile(__dirname+'/userinterface.html');
});













