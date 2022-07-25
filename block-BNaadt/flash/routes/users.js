var express = require('express');
var router = express.Router();
var User=require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
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
  var error=req.flash('error')[0];
  res.render('login.ejs',{error});
});

router.get('/dashboard',(req,res,next)=>{
  console.log(req.session);
  res.render('dashboard.ejs');
});

router.post('/login',(req,res,next)=>{
  var email=req.body.email;
  var password=req.body.password;
  if(!email || !password){
    console.log('Enter EMail and Password');
    req.flash('error','Enter Email and Password');
    return res.redirect('/users/login');
  }
  User.findOne({email:email},(err,user)=>{
    console.log(user);
    if(err) return next(err);
    if(!user){
      console.log('User not found');
      req.flash('error','User not registered');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password,(err,result)=>{
      if(err) return next(err);
      if(!result){
        console.log('Wrong Password');
        req.flash('error','Wrong Password');
        return res.redirect('/users/login');
      }
      console.log('User logged in');
      req.session.userId=user.id;
      res.redirect('/users/dashboard');
    })
  })
});

router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.clearCookie('connect.sid');
});

module.exports = router;
