var express = require('express')
var app = express();
var bodyParser  = require('body-parser');
var options = require('node-options');
app.use(bodyParser.json());

var opts = {
    'port': process.env.PORT || 3000
}
var result = options.parse(process.argv.slice(2), opts);
var port = opts.port;

const SAMPLE_USERS = require('./sample-rsvps.json').rsvps;
console.log(SAMPLE_USERS);
let USERS = {};
SAMPLE_USERS.forEach(u => {
    USERS[u.rsvpKey] = u;
})

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

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})