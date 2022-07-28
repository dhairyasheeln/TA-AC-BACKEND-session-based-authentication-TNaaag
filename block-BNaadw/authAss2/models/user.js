var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt');

var userSchema=new Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    city:{type:String}
},{timestamps:true});

userSchema.pre('save',function(next){
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password,10,(err,hash)=>{
            if(err) return next(err);
            this.password=hash;
            next();
        });
    }
    else{
        next();
    }
})

userSchema.methods.verifyPassword=function(password,cb){
    bcrypt.compare(password,this.password,(err,result)=>{
        return cb(err,result);
    });
}

var User=mongoose.model('User',userSchema);
module.exports=User;