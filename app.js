const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const serverlist=require('./util/serverlist');
const proxy=require('express-http-proxy');

app.use(bodyparser.json());




const port=serverlist.serverlist.rootserver.port;
app.use('/admin',proxy('localhost:'+serverlist.serverlist.adminserver.port));

app.listen(port,()=>{
    console.log(`root server start on port ${port}`);
})



