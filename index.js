const express = require('express');
const app = express();
const port = 3000;
app.listen(port, ()=>{ console.log('Hello! I\'m listening on port:3000');

});

app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

//receiving the data that the client sent to the api endpoint ('/api')
app.post('/api', (request, response) =>{

    //lets see the body of the content of the request
    console.log(request.body);

    //preparing to return the receieved content back to the client just so they know you got 
    //their message(talk about being polite)
    response.json({
        status : 'success',
        latitude : request.body.lat,
        longitude : request.body.lon,
        timestamp : request.body.time,
        accuracy : request.body.accurate
    });
});