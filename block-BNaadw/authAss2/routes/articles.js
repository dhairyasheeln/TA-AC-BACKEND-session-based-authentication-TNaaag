var express = require('express');
var router = express.Router();
var Article=require('../models/article');
var Comment=require('../models/comment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Article.find({},(err,articles)=>{
    // console.log(err,articles);
    res.render('articles.ejs',{articles:articles});
  });
});

router.get('/new',(req,res,next)=>{
  res.render('articleForm.ejs');
});

router.post('/',(req,res,next)=>{
  console.log(req.body);
  Article.create(req.body,(err,article)=>{
    console.log(err,article);
    res.redirect('/articles');
  });
});

router.get('/:slug',(req,res,next)=>{
  if(!req.session.userId){
    var error=req.flash('error','Please LogIn');
    res.redirect('/users/login')
  }
  else{
    
  // var id=req.params.id;
  var slug=req.params.slug;
  console.log(slug);
  Article
  // .findById(id)
  .findOne({slug:slug})
  .populate('comments')
  .exec((err,article)=>{
    console.log('error: '+err+' Article: '+article,' type Of Article: '+typeof(article));
    res.render('articleDetails.ejs',{article:article});
  });
  }

});

router.post('/:id/comment',(req,res,next)=>{
  var articleId=req.params.id;
  req.body.articleId=articleId;
  Comment.create(req.body,(err,comment)=>{
    Article.findByIdAndUpdate(articleId,{$push:{comments:comment.id}},{new:true},(err,article)=>{
      console.log(err,comment,article);
      res.redirect('/articles/'+article.slug);
    })
  });
});



module.exports = router;
