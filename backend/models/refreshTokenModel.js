const mongoose=require('mongoose');
const refreshTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});
module.exports=mongoose.model('RefreshToken',refreshTokenSchema);