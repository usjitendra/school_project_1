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
            id:item.id
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


module.exports=router;

