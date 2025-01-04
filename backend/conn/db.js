// const mongoose=require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/HotelBookingApp')
// .then(()=>console.log("database connected"))
// .catch((e)=>console.log("database not connected"))

require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log("database connected"))
.catch((e)=>console.log("database not connected",e))



