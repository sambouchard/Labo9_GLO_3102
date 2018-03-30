const express = require('express');
const path = require('path');
const nJwt = require('njwt');
const cors = require('cors');
const Cookies = require('js-cookie');
const uuidv4 = require('uuid/v4');
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

const port = process.env.PORT || 8080;



const users = [{username: 'sam', password: '1234'}, {username:'vaun' , password: 'orage'}];
const secretkey = uuidv4();

const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(function(req,res,next){
    let _send = res.send;
    let sent = false;
    res.send = function(data){
        if(sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});


app.post('/login',function (req,res) {
    let usertoidentify = req.body.username;
    let passtoidentify = req.body.password;
    for(let i = 0; i < users.length; i++){
        if(usertoidentify == users[i].username && passtoidentify == users[i].password){
            let claims = {
                sub: usertoidentify,
                iss: 'labo8/server',
                permissions: 'access user profile'
            }
            let jwt = nJwt.create(claims,secretkey);
            let token = jwt.compact();
            Cookies.set('access_token',token,{path: '/userprofile'});
            res.cookie('access_token',token);
        }
        else {
            res.status(403).send('Combinaison invalide');
        }
    }
});

app.get('/userprofile',function (req,res) {
    let cookies = Cookies.get('access_token');
    if(nJwt.verify(cookies,secretkey)){
        res.render('./userprofile.html')
    }
    else{
        res.render('./login.html')
    }

})

app.post('/users',function (req,res) {
    let username = req.body.username;
    let password = req.body.password;
    users.append({username:username,password:password})
})

app.listen(port, function() {
    console.log('Server listening.')
});






