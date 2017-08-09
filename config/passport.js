const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
const Deploiement = require('../models/deploiement');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload,done) => {
        User.getUserById(jwt_payload._doc._id, (err,user)=>{
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
        Deploiement.getDeploiementById(jwt_payload._doc._id, (err,deploiement)=>{
            if(err){
                return done(err, false);
            }
            if(deploiement){
                return done(null, deploiement);
            }else{
                return done(null, false);
            }
        });
    }));
}