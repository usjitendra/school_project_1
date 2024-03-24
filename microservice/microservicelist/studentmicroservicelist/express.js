const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const server=require('../../../util/serverlist');
const studentController=require('../studentmicroservicelist/controller/studentcontroller');

app.use(bodyparser.json());
app.use('/',studentController);


const port=server.serverlist.studentserver.port;


app.listen(port,()=>{
      console.log(`student server start on ${port}`);
})

