const express=require('express');
const app=express();
const mongoose=require('mongoose');
const router=express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Register=require('../model/Registershema');
require('dotenv').config();

JWT_SECRET=process.env.JWT_SECRET;
// =============== register information store ================

router.post("/", async (req, res) => {
  try {
     const { username, password, email } = req.body;
     if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
     }
    // Check if the user already exists
      const existingUser = await Register.findOne({ email });
       if (existingUser) {
        return res.status(409).json({ message: "Email already registered." });
     }
    // Create and save the new user
        const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password
        const userRegister = new Register({ username, password: hashedPassword, email });
        await userRegister.save();
        res.status(201).json({ message: "User registered successfully!" });
  }
  catch (error) {
     console.error("Error during registration:", error);
     res.status(500).json({ message: "Internal server error." });
  }
});

// ==================== login information store here ====================
router.post('/login', async (req, res) => {

  const { email, password } = req.body;
  try {
      const user = await Register.findOne({ email });
      if (!user) 
        return res.status(404).json({ message: 'User not found' });

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15d' });
      res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } 
  catch (err) {

      res.status(500).json({ message: 'Error logging in', error: err });
   }
});

// ============= cheack authetication =========================
const authenticate = (req, res, next) => {
   const token = req.header('Authorization');
    if (!token) 
      return res.status(401).send('Access Denied');
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

  router.get('/',authenticate,async(req,res)=>{
      try{  
         if(req.user.id)
         {
          res.status(200).json({userId:`${req.user.id}`})
         }
       }
      catch(e)
      {
          console.error(e);
      }
  })
module.exports = router;
