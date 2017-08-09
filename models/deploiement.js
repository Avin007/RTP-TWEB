const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//deploiement Schema
const DeploiementSchema = mongoose.Schema({
    licao: {
        type: String,
        required: true
    },
    name_companie:{
        type: String,
        required: true
    },
    login:{
        type:String,
        required: true
    },
    type_deploiement:{
        type: String,
    },
    name_application:{
        type: String,
        required: true,
    },
    date_depart:{
        type: Date,
        required: true,
    },
    date_retour:{
        type: Date,
        required: true,
    },
    day_number:{
        type: Number,
    },
    document:{
        type: String,
    }
});

const Deploiement = module.exports = mongoose.model('Deploiement', DeploiementSchema);

module.exports.getDeploiementById = function(id,callback){
    Deploiement.findById(id,callback);
}

module.exports.getDeploiementBylogin= function(login,callback){
    const query = {login:login}
    Deploiement.findOne(query,callback);
}

module.exports.addDeploiement = function(newDeploiement, callback){
    newDeploiement.save(callback);
}
