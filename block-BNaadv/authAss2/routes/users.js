var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',(req,res,next)=>{
  res.render('register.ejs');
});

router.post('/register',(req,res,next)=>{
  console.log('register');
  User.create(req.body,(err,user)=>{
    console.log(err,user);
    res.redirect('/users/login');
    });
})

router.get('/login',(req,res,next)=>{
  var error=req.flash('error')[0];
  res.render('login.ejs',{error:error});
});

router.post('/login',(req,res,next)=>{
  var email=req.body.email;
  var password=req.body.password;
  if(!email || !password){
    console.log('Enter Email and Password');
    req.flash('error','Enter Email and Password');
    return res.redirect('/users/login');
    
  }
  User.findOne({email:email},(err,user)=>{
    if(err) return next(err);
    if(!user){
      console.log('User not regsistered');
      req.flash('error','User not registered');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password,(err,result)=>{
      if(err) return next(err);
      if(!result){
        console.log('Wromg Password');
        req.flash('error','Wrong Password');
        return res.redirect('/users/login');
      }
      console.log('User logged in');
      req.session.userId=user.id;
      res.send('User logged In');
    })
  });
});

module.exports = router;
