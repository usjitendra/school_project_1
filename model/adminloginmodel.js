const mongoose = require('mongoose');
const db = require('../config/dbconnection');
const bcrypt=require('bcrypt');


const admin = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    lastName: {
        require: true,
        type: String
    },
    fatherName: {
        require: true,
        type: String
    },
    mobileNo: {
        require: true,
        type: String
    },
    email: {
        require: true,
        unique: true,
        type: String
    },
    password:{
        require:true,
        type:String
    },
    address: {
        require: true,
        type: String,
    },
    pincode:{
        type:Number,
        require:true
    },


})

admin.pre('save',async function(next){
  try{
     this.email=this.email.toLowerCase();
     if(!this.isModified('password')){
        return next();
     }else{
        this.password= await bcrypt.hash(this.password,10);
        return next();
     }

  }catch(error){
    return next(error);
  }
})

module.exports = db.connect.model('admin', admin);