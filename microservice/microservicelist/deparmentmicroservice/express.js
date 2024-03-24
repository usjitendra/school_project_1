const express=require('express');
const app=express();
const departmentcontrolller=require('../deparmentmicroservice/controller/departmentcontroller');
const bodyparse=require('body-parser');
const servelist=require('../../../util/serverlist');

app.use(bodyparse.json());
app.use('/',departmentcontrolller);

const port=servelist.serverlist.department.port;


app.listen(port,()=>{
      console.log(`department setrver start on ${port}`);
})