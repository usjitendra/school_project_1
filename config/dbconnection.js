const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/school_poject_1',{useNewUrlParser:true});

const connect=mongoose.connection;

 connect.on('error',console.error.bind(console,"db connection error"));
 connect.once('open',function(){
      console.log("db connection sucessful");
 })


 module.exports={connect};

