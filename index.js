const express = require('express');
const Datastore = require('nedb');
const app = express();
const port = 3000;
app.listen(port, ()=>{ console.log('Hello! I\'m listening on port:3000');

});

app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

// const database = [];//creating a storage for data that'll later be stored to a database, yay!!!
const database = new Datastore('database.db');
database.loadDatabase();
// database.insert({name: 'kennie', career: 'Software Developer'});

//receiving the data that the client sent to the api endpoint ('/api')
app.post('/api', (request, response) =>{

    //lets see the body of the content of the request
    console.log(request.body);

    //saving the body content of the request received from the client side
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    //adding the request.body AKA 'data' to our database array created earlier
    //What this means is that, each time the client side makes a request, a new request.body
    //data is stored in our database array and so it populates, bliss!!!
    // database.push(data);
    //insert data to database
    database.insert(data);
    //let's see if the 'data' is properly saved in our database array
    // console.log(database);
   

    //preparing to return the receieved content back to the client just so they know you got 
    //their message(talk about being polite)
    response.json({
        status : 'success',
        latitude : request.body.lat,
        longitude : request.body.lon,
        timestamp : timestamp,
        accuracy : request.body.accurate
    });
});