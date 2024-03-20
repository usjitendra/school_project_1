const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const serverlist=require('../../../util/serverlist');
const controller=require('../adminmicroservicelist/controller/admincontroller');

app.use(bodyparser.json());
app.use('/',controller);


const port=serverlist.serverlist.adminserver.port;


app.listen(port,()=>{
    console.log(`admin server start on ${port}`);
})

