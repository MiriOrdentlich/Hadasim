//imports frameworks and models
const express = require('express');
const mongoose = require('mongoose');
const Patient = require('./models/patient.js');
const CovidData = require('./models/CovidData.js');
const patientRoute = require('./routes/patientRoute.js');
const covidDataRoute = require('./routes/covidDataRoute.js')

//creates express app
const app = express()


//Enable parsing of JSON bodies in incoming requests
app.use(express.json());

//routes
app.use("/api/patients" , patientRoute);
app.use("/api/coviddata" , covidDataRoute);


//route for handling HTTP GET requests to the root URL ("/") of the server
app.get('/' , (req, res) =>
{ //callback for handling requests to the root URL
    
    res.send("hi from node API server"); //send respone to client
});



mongoose.connect("mongodb+srv://admin:admin1234@cluster0.3w8ipdr.mongodb.net/Coronavirus-Cases?retryWrites=true&w=majority&appName=Cluster0")
.then(() =>
{
    console.log("connected");

        
    //.listen(port number,callback func)
    //starts the express server on port 3000
    app.listen(3000, () =>
    {
        console.log('Server is running on port 3000');
    });
})
.catch(()=>
{
    console.log("failed");
});