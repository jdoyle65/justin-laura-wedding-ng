var express = require('express')
var app = express();
var bodyParser  = require('body-parser');
app.use(bodyParser.json());

const USERS = require('./sample-rsvps.json');

app.get('/api/user/:token', function (req, res) {
    const token = req.params.token;

    if (USERS[token]) {
        res.json({error: 0, user: USERS[token]});
    } else {
        res.json({error: 1, message: `Invalid Token: ${token}`})
    }
});

app.post('/api/user/:token', function (req, res) {
    const token = req.params.token;

    if (USERS[token]) {
        USERS[token] = req.body.user;
        res.json({error: 0, user: USERS[token]});
    } else {
        res.json({error: 1, message: `Invalid Token: ${token}`})
    }
});

app.use(express.static('public'));
app.use('**', express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})