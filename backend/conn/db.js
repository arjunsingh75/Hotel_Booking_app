// const mongoose=require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/HotelBookingApp')
// .then(()=>console.log("database connected"))
// .catch((e)=>console.log("database not connected"))

const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://arjun:arjunpassword@cluster0.11qsq.mongodb.net/')
.then(()=>console.log("database connected"))
.catch((e)=>console.log("database not connected"))


