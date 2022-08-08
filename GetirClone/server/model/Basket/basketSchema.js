const mongoose = require('mongoose');


const basketSchema = new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
    },
    product:{
        type:Object,
        default : []
    },
    totalPrice :{
        type : Number,
        default:0.0
    },
    quantity:{
        type:Number
    }
});

const Basket = mongoose.model("Basket",basketSchema);

module.exports = Basket;