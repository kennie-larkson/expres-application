const express = require('express');
const Datastore = require('nedb');
const app = express();
const port = 3000;
app.listen(port, ()=>{ console.log('Hello! I\'m listening on port:3000');

});

app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();


//Router (GET)
app.get('/api',(request, response)=>{

    database.find({},(err, data)=>{
        if(err){
            response.end();
            return
        }
        response.json(data);

    });
    
});

//Router (POST)
app.post('/api', (request, response) =>{

    console.log(request.body);
    //saving the body content of the request received from the client side
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    //insert data to database
    database.insert(data);
    //preparing to return the receieved content back to the client just so they know you got 
    //their message(talk about being polite)
    response.json(data);
});