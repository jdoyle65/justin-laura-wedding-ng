var express = require('express')
var app = express();
var bodyParser  = require('body-parser');
var options = require('node-options');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config.json');
var db = null;
var opts = {
    'port': process.env.PORT || 3000
}
var result = options.parse(process.argv.slice(2), opts);
var port = opts.port;

const pass = encodeURIComponent(config.mongo_password);
const user = encodeURIComponent(config.mongo_user);
const host = encodeURIComponent(config.mongo_host);
const mongoPort = encodeURIComponent(config.mongo_port || 27017);
const mongoDb = encodeURIComponent(config.mongo_database)

const connString = `mongodb://${user}:${pass}@${host}:${mongoPort}/${mongoDb}`;
MongoClient.connect(connString, function (err, database) {
  if (err) throw err
  db = database;
})

app.use(bodyParser.json());

const SAMPLE_USERS = require('./sample-rsvps.json').rsvps;
let USERS = {};
SAMPLE_USERS.forEach(u => {
    USERS[u.rsvpKey] = u;
})

app.get('/api/user/:token', function (req, res) {
    const token = req.params.token;

    db.collection('rsvps').findOne({ rsvpKey: token }, (err, data) => {
        console.log(token);
        if (err || data === null) {
            console.log(err);
            res.json({error: 1, message: `Invalid Token: ${token}`})   
        } else {
            delete data._id;
            res.json({error: 0, user: data});
        }
    });
});

app.post('/api/user/:token', function (req, res) {
    const token = req.params.token;

    db.collection('rsvps').findOneAndUpdate(
        { rsvpKey: token },
        { $set: req.body.user },
        (err, data) => {
        if (err || data === null) {
            console.log(err);
            res.json({error: 1, message: `Invalid Token: ${token}`})   
        } else {
            res.json({error: 0, user: data});
        }
    });
});

app.use(express.static('public'));
app.use('**', express.static('public'));

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})