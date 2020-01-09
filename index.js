const express = require('express');
const app = express();
const port = 3000;
app.listen(port, ()=>{ console.log('Hello! I\'m listening on port:3000');

});

app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

app.post('/api', (request, response) =>{
    console.log(request.body);

    response.json({
        status : 'success',
        latitude : request.body.lat,
        longitude : request.body.lon,
        timestamp : request.body.time,
        accuracy : request.body.accurate
    });
});