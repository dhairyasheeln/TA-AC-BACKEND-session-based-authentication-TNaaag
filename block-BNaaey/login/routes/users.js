var express = require('express');
var router = express.Router();
var User=require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.send('respond with a resource');
});

router.get('/register',(req,res,next)=>{
  res.render('register.ejs');
});

router.post('/register',(req,res,next)=>{
  User.create(req.body,(err,user)=>{
    console.log(err,user);
  });
});

router.get('/login',(req,res,next)=>{
  res.render('login.ejs');
});

router.post('/login',(req,res,next)=>{
  var email=req.body.email;
  var password=req.body.password;
  if(!email || !password){
    return res.redirect('/users/login');
  }
  User.findOne({email:email},(err,user)=>{
    if(err) return next(err);
    if(!user){
      return res.redirect('/users/login');
    }
    /*Verify Password*/
    user.verifyPassword(password,(err,result)=>{
      console.log(err,result);
      if(err) return next(err);
      if(!result){
        console.log(err,result);
        return res.redirect('/users/login');
      }
      /*Create Session*/
    req.session.userId=user.id;
    res.redirect('/users');
    })
    
  })
});

module.exports = router;
