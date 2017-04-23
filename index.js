var express = require('express')
var app = express();
var bodyParser  = require('body-parser');
var AWS = require('aws-sdk')
app.use(bodyParser.json());

AWS.config.loadFromPath('./config.json');
var db = new AWS.DynamoDB.DocumentClient();

function findRsvp(rsvpKey) {
    var params = {
    TableName : "wedding-rsvps",
    KeyConditionExpression: 'rsvpKey = :key',
    ExpressionAttributeValues: { ':key': rsvpKey }
};
    db.query(params, (err, data) => {
        if (err) {
            console.log('Error');
            console.log(err);
        } else {
            console.log('Query Succeeded');
            console.log(data);
        }
    })
}
findRsvp('justindoyle');

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