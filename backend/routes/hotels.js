const express=require('express');
// const app=express();
const mongoose=require('mongoose');
const hotel=require('../model/hotelschema');
const router = express.Router();

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

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        if(data){
        const hoteldata=new hotel(data);
        hoteldata.save();
        res.status(200).json({message:'hotel data saved '});
        }
     
    }catch(e){
        res.status(500).json({message:"data storing time error",error:e.message});
    }
})
module.exports=router;


