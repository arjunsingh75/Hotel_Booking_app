const express=require('express');
// const app=express();
const mongoose=require('mongoose');
const hotel=require('../model/hotelschema');
const router = express.Router();
const jwt=require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', async (req, res) => {
    try {
        const hotels = await hotel.find(); // Fetch all hotels
        if (hotels.length>0) {
            res.json(hotels);
        } else {
            res.status(404).send({ message: '"No" hotels found' }); 
        }
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).send({ error: 'Internal Server Error' }); 
    }
});


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
        if(data){
        data.userid=req.user.id;
        const hoteldata=new hotel(data);
        hoteldata.save();
        res.status(200).json({message:'hotel data saved '});
        }
     
      }
      catch(e){
          res.status(500).json({message:"data storing time error",error:e.message});
      }
  })

 router.delete('/:id', async (req, res) => {
  try {  
    await hotel.findOneAndDelete({ userid:req.params.id});
    res.status(200).json({message:'Booking deleted'});
   } 
  catch (err) {
    res.status(400).send(err.message);
   }
 });

module.exports=router;


