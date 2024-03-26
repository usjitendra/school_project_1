const mongoose=require('mongoose');
const db=require('../config/dbconnection');

const departmentschema=new mongoose.Schema({
     name:{
        type:String,
        require:true
     },
     userid:{
        type:mongoose.Schema.ObjectId,
        require:true
     },
     department:{
        type:String,
        require:true
     },
     location:{
      type:String,
      require:false
     },
     room:{
      type:Number,
      require:false
     },
     fee:{
      type:Number,
      require:false
     },
     floor:{
        type:Number,
        require:false
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