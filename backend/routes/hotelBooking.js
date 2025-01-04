const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const booking=require('../model/Bookingshema');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

//check authorization
const authenticate = (req, res, next) => {
   const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = {
        id: verified.id || verified.user?.id,
       };
      next();
    } 
    catch (err) {
      res.status(400).send('Token expired or invalid');
    }
  };

router.post('/',authenticate,async(req,res)=>{
    try{
      const data=req.body;
      data.userid=req.user.id;
      const bookhotel= new booking(data);
      await bookhotel.save();
      res.status(200).json({Message:"booking succesfull"}); 
  }
  catch(e){
    res.status(500).json({Message:"booking time error "});
  }
})

router.get('/',authenticate,async(req,res)=>{
    try{  
      const data = await booking.find({ userid:req.user.id});  
        if(data){
            res.json(data);
        }
        else{
            res.status(500).json({Message:" data not found"});
        }
    }
    catch(e)
    {
        console.error(e);
    }
})

router.delete('/:id', async (req, res) => {
  try {  
    await booking.findOneAndDelete({ userid:req.params.id});
    res.status(200).json({message:'Booking deleted'});
  } 
  catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports=router;