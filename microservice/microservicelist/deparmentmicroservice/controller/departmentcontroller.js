const express=require('express');
 const router=express.Router();
const bodyparse=require('body-parser');
const { body } = require('express-validator');
const departmentmodel=require('../../../../model/departmentmodel');


router.use(bodyparse.json());


router.route('/add').get((req,res)=>{
       try{
          const item=req.body;
          console.log(item);
          const data={
            name:item.name,
            department:item.department,
            userid:item.id,
            location:item.location,
            fee:item.fee,
            room:item.room,
            floor:item.floor
          }
          departmentmodel.create(data)
          .then((detail)=>{
              return res.status(200).send({message:"Data saved successful",data:detail})
          }).catch(err=>{
            return res.status(400).send({message:"Data not saved",error:err})
          })

       }catch(err){
          res.status(500).send({message:"Internal server error",error:err.message});
       }
})


router.route('/aggregate').get(async (req, res) => {
       try{
              const detail=await departmentmodel.aggregate([
                {
                   $lookup:{
                    from:"students",
                    localField:"userid",
                    foreignField:"_id",
                    as:"suser"
                   }
                },
                {
                  $unwind:{
                      path:"$suser",
                      preserveNullAndEmptyArrays:true
                  }
                },
                {
                  $project:{
                    "name":"$suser.name",
                     "price":"$fee",
                     "class":"$suser.class",
                     
                  }
                }
              ])
              res.status(200).send({message:"deta find successful",data:detail});
       }catch(err){
               res.status(500).send({message:"Internal server error",error:err.message});
       }
});

router.route('/aggregate/filter').get(async(req,res)=>{
      console.log("adadad");
   try{  
     const detail=await departmentmodel.aggregate([
      {
         "$match": { "location":"pune" }
      },
      {
        "$group":{"_id":"$_id","price":{"$first":"$fee"},"floorrom":{"$sum":{"$add":["$room","$floor"]}}}
      },
        {
          "$sort":{"floorrom":1}
        }
    ])
      res.status(200).send({message:"Data find successful",data:detail});
    }
    catch(err){
        res.status(500).send({message:"Internal server error",error:err.message});
    }
})
module.exports=router;

