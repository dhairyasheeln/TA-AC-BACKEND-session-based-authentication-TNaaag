var express = require('express');
var router = express.Router();
var User=require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',(req,res,next)=>{
  res.render('userRegister.ejs');
});

router.post('/register',(req,res,next)=>{
  User.create(req.body,(err,user)=>{
    if(err) return next(err);
    console.log(user);
  });
});

router.get('/login',(req,res,next)=>{
  res.render('userLogin.ejs');
});

router.post('/login',(req,res,next)=>{
  var email=req.body.email;
  var password=req.body.password;
  if(!email || !password){
    console.log('Enter Email and Password');
    res.redirect('/users/login');
  }
  User.findOne({email:email},(err,user)=>{
    if(err) return next(err);
    if(!user){
      console.log('User not registered');
      res.redirect('/users/login');
    }
    user.verifyPassword(password,(err,result)=>{
      if(err) return next(err);
      if(!result){
        console.log('Wrong Password');
        return res.redirect('/users/login');
      }
      console.log('User logged In');
    })
  })
});

module.exports = router;
