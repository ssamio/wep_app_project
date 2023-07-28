//Router for authentication and authorization
var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

//Validators for password and email stored as return values
const emailValidate = () => body('email').isEmail().normalizeEmail();
const passwordValidate = () => body('password').trim().escape().isStrongPassword({
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
});

//POST for registering user
router.post('/register', emailValidate(), passwordValidate(), async (req, res) =>{
  //Validate email and password
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error: "Email needs to be a proper email. Password needs to have minimum 8 characters, one capital letter, one small letter, one number and one symbol."});
  }

  const query = await User.findOne({ email: req.body.email}).exec();
  if(query){
    return res.status(403).json({error: "Email registered already!"}); 
  }
  else{
    let username;
    if(!req.body.username){
      username = req.body.email;
    }
    else{
      username = req.body.username;
    }
    await User.create({
      email: req.body.email,
      username: username,
      password: req.body.password
    })
    .then(ok =>{
      if(!ok){
        return res.status(500).json({error: "User registering failed!"});
      }
      else{
        return res.status(200).json({message: "User registered succesfully! Please login."});
      }
    });
  }
});

//POST for logging in. If succesful, return the JWT token to the client
router.post('/login', emailValidate(), passwordValidate(), async(req, res) =>{
  //Validate email and password 
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error: "Invalid email or password"});
  }
  try{
    const { email, password } = req.body;
    
    User.findOne({email: email}).exec()
    .then(user => {
      if(!user){
        return res.status(400).json({error: "Invalid email or password"});
      }
      else{
        bcrypt.compare(password, user.password, (err, isMatch) =>{
          if(err){
            throw err;
          }
          else if(!isMatch){
            return res.status(400).json({error: "Invalid email or password"});
          }
          else{
            const token = jwt.sign({
              email: user.email,
              id: user._id,
              username: user.username,
              adminStatus: user.adminStatus
            },
            process.env.SECRET,
            {
              expiresIn: "1h",
            });
            res.status(200).json({message: "Login success!", token});
          }
        });
      }
    })
    

  }
  catch(error){
    console.log(error);
  }
});


module.exports = router;
