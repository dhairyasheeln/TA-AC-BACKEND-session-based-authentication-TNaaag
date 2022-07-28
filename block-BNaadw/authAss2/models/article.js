var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var slugger=require('slugger');

var articleSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    likes:{type:Number,default:0},
    comments:[{type:Schema.Types.ObjectId,ref:"Comment"}],
    author:{type:String},
    slug:{type:String,unique:true}
});

articleSchema.pre('save',function(next){
    var title=this.title;
    var slug=slugger(title);
    this.slug=slug;
    next();
})


var Article=mongoose.model('Article',articleSchema);
module.exports=Article;
