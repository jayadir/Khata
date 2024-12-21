const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    }
},{timestamps:true});
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})
userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.index({mobile:1},{unique:true});
const User = mongoose.model('user',userSchema);
module.exports = User;