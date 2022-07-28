var express=require('express');
const app = require('../app');
var router=express.Router();var User=require('../models/user');

/*Routes*/

router.get('/register',(req,res,next)=>{
    res.render('register.ejs');
});

router.post('/register',(req,res,next)=>{
    User.create(req.body,(err,user)=>{
    console.log(err,user);
    if(err) return next(err);
    res.redirect('/users/login');
    });
});

router.get('/login',(req,res,next)=>{
    console.log(req.session.userId);
    var error=req.flash('error')[0];
    res.render('login.ejs',{error:error});
});

router.post('/login',(req,res,next)=>{
    var email=req.body.email;
    var password=req.body.password;
    if(!email  || !password){
        console.log('Enter Email and Password');
        req.flash('error','Enter Email and Password');
        return res.redirect('/users/login');
    }
    User.findOne({email:email},(err,user)=>{
        if(!user){
            console.log('User not registered');
            req.flash('error','User not registered');
            return res.redirect('/users/login');
        }
        user.verifyPassword(password,(err,result)=>{
            console.log(err,result);/*Why is this getting skipped when result is false*/
            if(err) return next(err);
            if(!result){
                console.log('Wrong Password');
                req.flash('error','Wrong Password');
                res.redirect('/users/login');
                return res.redirect('/users/login');
            }
            console.log('User logged in');
            req.session.userId=user.id;
            res.redirect('/articles');
        })
        
    });
});


router.get('/logout',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/articles');
});

module.exports=router;