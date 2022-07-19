var express=require('express');
var cookieParser=require('cookie-parser');

var app=express();

app.use(cookieParser());

app.use((req,res,next)=>{
    res.cookie("username","dhiru");
    next();
});

app.use('/',(req,res,next)=>{
    console.log(req.cookies);
    res.send('Welcome!');
});

app.listen(4400,()=>console.log('Listening on port 4400'));