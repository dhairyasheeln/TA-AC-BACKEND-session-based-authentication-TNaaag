var express=require('express');
const Article = require('../models/article');
var router=express.Router();
var Comment=require('../models/comment');

router.get('/:id/edit',(req,res,next)=>{
    var commentId=req.params.id;
    Comment.findById(commentId,(err,comment)=>{
        res.render('commentEditForm.ejs',{comment:comment});
    });
});

router.post('/:id/edit',(req,res,next)=>{
    var commentId=req.params.id;
    Comment.findByIdAndUpdate(commentId,req.body,(err,updatedComment)=>{
        Article.findById(updatedComment.articleId,(err,article)=>{
            res.redirect('/articles/'+article.slug);
        })
        
    });
});
/*Ask this to Mentor if instead of Article Id , Article Slug needs to be entered while  adding comments*/
router.get('/:id/delete',(req,res,next)=>{
    var id=req.params.id;
    Comment.findByIdAndDelete(id,(err,comment)=>{
        Article.findByIdAndUpdate(comment.articleId,{$pull:{comments:comment.id}},(err,article)=>{
            res.redirect('/articles/'+article.slug);
        })
        
    });
});

module.exports=router;