const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    phoneNumber:{
        type : String,
        required : true,
        unique : true
    },
    fullName : {
        type:String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    favouriteProduct :{
       type:Object,
       default : []
    },
    adress :{
       type:Object,
       default : []
    },
    myBasket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Basket",
    },
    isBlocked : {
        type : Boolean,
        default:false
    },
    isAdmin:{
        type : Boolean,
        default:false
    }

},{
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    },
    timestamps : true
});

//hash phonenumber

userSchema.pre('save',async function(next){
    if(!this.isModified('phoneNumber')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.phoneNumber = await bcrypt.hash(this.phoneNumber,salt);
    next();
});

//match password

userSchema.methods.matchPhoneNumber = async function(enteredphoneNumber){
    return await bcrypt.compare(enteredphoneNumber,this.phoneNumber);
}



const User = mongoose.model("User",userSchema);

module.exports = User;