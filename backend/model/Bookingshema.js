const mongoose=require('mongoose');
const hotelbooking=new mongoose.Schema({
    userid: { type:String, required: true },
    name: {
        type: String,
        required: true,
        trim: true,
      },
      hotelname: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
    },
    checkin: {
        type: Date,
        required: true,
       
      },
      checkout: {
        type: Date,
        required: true,
      },
      totalcost: {
        type: Number,
        required: true,
    },
    Roomtype: {
        type: String,
        required: true,
      },
      Numberofroom: {
        type: Number,
        required: true,
    },
})

module.exports=mongoose.model('BookingData',hotelbooking);