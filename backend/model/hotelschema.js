const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
  userid: { type:String, required: true },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  img: {
    type:[String], // Array of image URLs
    required: true,
  },
  rooms: [
    {
      roomType: { type: String, required: true }, // e.g., Single, Double, Suite
      price: { type: Number, required: true }, // Price per night
      availability: { type:String, default:'No' },
      numofroom:{type:Number,required:true},
    },
  ],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  facilities: {
    type: [String], // Additional features like "Free WiFi", "Swimming Pool", etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);
