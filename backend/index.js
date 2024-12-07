const express = require('express');
const app = express();
const hotelsRoute = require('./routes/hotels');
const Register = require('./routes/Register');
const hotelbooking=require( './routes/hotelBooking')
const bodyparser = require('body-parser');
require('./conn/db');
const cors = require('cors');


// // Middleware
app.use(cors()); 
app.use(bodyparser.json()); 

// Routes
app.use('/api/hotelsdata', hotelsRoute);
app.use('/api/Register', Register);
app.use('/api/hotelbooking',hotelbooking);



// Server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

