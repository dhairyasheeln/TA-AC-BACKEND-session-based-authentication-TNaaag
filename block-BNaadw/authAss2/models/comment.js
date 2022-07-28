var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var commentSchema=new mongoose.Schema({
    content:{type:String,required:true},
    author:{type:String,required:true},
    articleId:{type:Schema.Types.ObjectId}
}); 

var Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;