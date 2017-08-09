const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

router.post('/register', (req,res,next)=>{
  let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      numposte: req.body.numposte,
      site: req.body.site,
  });
  User.addUser(newUser,(err,user)=>{
      if(err){
          res.json({success:false,msg:'Failed to register user'});
      } else{
          res.json({success:true,msg:'User registered'});
      }
   });
});

router.post('/authenticate', (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    User.getUserByEmail(email,(err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg :'Email not found'});
        }
        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //1 week
                });
                res.json({
                    success:true,
                    token:'JWT ' + token,
                    user:{
                        id: user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email,
                        numposte:user.numposte,
                        site: user.site,
                    }
                });
            }else{
                return res.json({success:false ,msg: 'Wrong password'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user});
});

module.exports = router;