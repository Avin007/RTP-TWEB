const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Deploiement = require('../models/deploiement');

router.post('/register', (req,res,next)=>{
  let newDeploiement = new Deploiement({
      licao: req.body.licao,
      name_companie: req.body.name_companie,
      login: req.body.login,
      type_deploiement:req.body.type_deploiement,
      name_application: req.body.name_application,
      date_depart: req.body.date_depart,
      date_retour: req.body.date_retour,
      day_number: req.body.day_number,
      document: req.body.document,
  });
  Deploiement.addDeploiement(newDeploiement,(err,deploiement)=>{
      if(err){
          res.json({success:false,msg:'Failed to register deploiement'});
      } else{
          res.json({success:true,msg:'deploiement registered'});
      }
   });
});

router.get('/deploiement-profile',(req,res,next)=>{
    Deploiement.find(function(err, deploiements){
    res.json(deploiements);
    })
});
/*
router.get('/profile/:id',(req,res,next)=>{
    Deploiement.findOne({_id: req.params.id},function(err, deploiements){
    res.json(deploiements);
    })
});

router.get('/deploiement-profile',(req,res,next)=>{
    Deploiement.findOne({_id: "598310867f329e22406b30e3" },function(err, deploiements){
    res.json(deploiements);
    })
});*/

module.exports = router;