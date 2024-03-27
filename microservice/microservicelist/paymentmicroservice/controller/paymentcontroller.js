const express=require('express');
const router=express.Router();
const coinpayment=require('coinpayments');
const bodyparser=require('body-parser');

const clinet= new coinpayment({
    key:"",
    secret:""
});

router.route('/add').get(async(req,res)=>{
        try{
            const {amount,currency,buyer_email}=req.query;

            const payment =await clinet.createTransaction({
                amount,
                currency1:currency,
                currency2:'BTC',
                buyer_email,
            })
            res.json({payment})
        }catch(err){
            res.status(500).send({error:err.message});
        }
})


module.exports=router;