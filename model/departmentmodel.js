const mongoose=require('mongoose');
const db=require('../config/dbconnection');

const departmentschema=new mongoose.Schema({
     name:{
        type:String,
        require:true
     },
     id:{
        type:String,
        require:true
     },
     department:{
        type:String,
        require:true
     },
     createAt:{
        type:Date,
        default:Date.now
        
     },
     updateAt:{
        type:Date,
        default:Date.now
     }


})


module.exports=db.connect.model('department',departmentschema);