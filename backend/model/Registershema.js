const mongoose=require('mongoose');
const register=mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
})

module.exports=mongoose.model('Register', register);