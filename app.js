const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const serverlist=require('./util/serverlist');
const proxy=require('express-http-proxy');

app.use(bodyparser.json());




const port=serverlist.serverlist.rootserver.port;
app.use('/admin',proxy('localhost:'+serverlist.serverlist.adminserver.port));
app.use('/student',proxy('localhost:'+serverlist.serverlist.studentserver.port));
app.use('/department',proxy('localhost:'+serverlist.serverlist.department.port));
app.use('/payment',proxy('localhost:'+serverlist.serverlist.payment.port));
app.listen(port,()=>{
    console.log(`root server start on port ${port}`);
})



