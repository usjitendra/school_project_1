const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser');
const adminmodel=require('../../../../model/adminloginmodel');
const auth=require('../../../../config/constaint');
const bcrypt=require('bcrypt');
const {generateToken}=require('../../../../helper/authvalidation');

console.log(auth.obj.auth);

router.use(bodyparser.json());



router.route('/registration').post(async (req, res) => {
    try {
        const item = req.body;

        // Check if adminmodel document already exists
        const existingData = await adminmodel.findOne();
        if (!existingData) {
            const data = {
                name: item.name,
                lastName: item.lastName,
                fathername: item.fathername,
                mobileNo: item.mobileNo,
                email: item.email,
                pincode: item.pincode,
                address: item.address,
                password:item.password
            };

            // Create new adminmodel document
            await adminmodel.create(data);
            res.send('Admin registration successful');
        } else {
            res.status(400).send('Admin already registered'); // Send error response if admin already exists
        }
    } catch (error) {
        console.error('Error during admin registration:', error);
        res.status(500).send('Internal Server Error'); // Send 500 status code for internal server error
    }
});


 router.route('/login').get(async(req,res)=>{
       
    try{
           const data= await adminmodel.findOne({email:req.body.email});
           if(!data){
                return   res.status(400).send({massage:"email not validat"});
           }else{
              const password=await bcrypt.compare(req.body.password,data.password);

              if(!password){
                  return res.status(400).send({massage:"password not match"});
              }
              else{
                console.log(data.id);
                res.status(200).send({massage:"logine successful",token:generateToken(data.id)});
              }

           }

    }catch(err){
        res.status(400).send({masssage:"Internal server error"});
        console.error(err);
    }
    
 })



module.exports=router