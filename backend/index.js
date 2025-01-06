const express = require('express');
const app = express();
const hotelsRoute = require('./routes/hotels');
const Register = require('./routes/Register');
const hotelbooking=require( './routes/hotelBooking')
const bodyparser = require('body-parser');
require('./conn/db');
const cors = require('cors');
require('dotenv').config();


// // Middleware
app.use(cors()); 
app.use(bodyparser.json()); 

// Routes
app.get('/',(req,res)=>{
    res.send("hello");
})
app.use('/api/hotelsdata', hotelsRoute);
app.use('/api/register', Register);
app.use('/api/hotelbooking',hotelbooking);



// Server
port=3000;
app.listen(port, () => {
    console.log("Server is listening ");
});

