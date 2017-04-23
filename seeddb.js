var MongoClient = require('mongodb').MongoClient;
var config = require('./config.json');

var seed = require('./seed-rsvps.json');

const pass = encodeURIComponent(config.mongo_password);
const user = encodeURIComponent(config.mongo_user);
const host = encodeURIComponent(config.mongo_host);
const mongoPort = encodeURIComponent(config.mongo_port || 27017);
const mongoDb = encodeURIComponent(config.mongo_database)

const connString = `mongodb://${user}:${pass}@${host}:${mongoPort}/${mongoDb}`;
MongoClient.connect(connString, function (err, db) {
  if (err) throw err;
    var rsvps = seed.rsvps;

    const mapRsvp = (rsvp) => {
        const guests = rsvp.guests.map(g => {
            return {
                "name": g,
                "selectedMeal": 0,
                "dietaryRestrictions": ""
            }
        });
        const rsvpKey = rsvp.name.replace(/[^a-zA-Z]/g, '').toLowerCase();

        return {
            "rsvpKey": rsvpKey,
            "name": rsvp.name,
            "isAttending": true,
            "songRequest": "",
            "attendingPaddys": false,
            "accommodations": "",
            "shareAccommodations": false,
            "maxGuests": rsvp.maxGuests,
            "guests": guests,
            "selectedMeal": 0,
            "dietaryRestrictions": "",
        }
    }

    var guestCount = 0;
    var withoutMaybes = 0;
    var toUpload = rsvps.map(r => {
        guestCount++;
        guestCount += r.maxGuests;

        if (r.maybe !== true) {
            withoutMaybes++;
            withoutMaybes += r.maxGuests;
        }
        return mapRsvp(r)
    });

    console.log('Max guest count: ' + guestCount);
    console.log('Without maybes: ' + withoutMaybes);

    console.log('Uploading guests...');

    // db.collection('rsvps').findOne({rsvpKey: "justindoyle"}, (e, d) => {
    //     console.log(e);
    //     console.log(d);
    //     return;
    // });

    // db.collection('rsvps').insertMany(toUpload, (uploadErr, uploadData) => {
    //     if (uploadErr) throw uploadErr;

    //     console.log('Uploading done');
    // })

})