const express =require('express');
const app=express();
const bodyparser=require('body-parser');
const server=require('../../../util/serverlist');
const controller=require('../paymentmicroservice/controller/paymentcontroller');

app.use(bodyparser.json());

app.use('/',controller);

const port=server.serverlist.payment.port;

app.listen(port,()=>{
    console.log(`payment server start on port ${port}`);
})



