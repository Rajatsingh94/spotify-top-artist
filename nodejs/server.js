const express = require('express');
const app = express();
const port = process.env.port || 4000

//Adding Bodyparser to the Backend
const bodyParser = require('body-parser');

//Adding BodyParser as a Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Acquiring Routes from Route file
const route = require('../nodejs/route');
app.use('/', route);


//Starting a Server 
app.listen(port, (req,res)=>{
    console.log('App listening to 4000');
})

