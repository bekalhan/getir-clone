const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type : String,
        //required : true
        default:"n"
    },
    description:{
        type : String,
        //required : true
        default:"n"
    },
    category:{
        type : String,
        //required:true,
        default:"All"
    },
    isLiked :{
        type:Boolean,
        default : false
    },
    isDisLiked :{
        type :  Boolean,
        default : false
    },
    image : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2018/04/16/10/13/newspaper-3324168_960_720.jpg"
    },
    price:{
        type : Number,
        //required : true,
        default:0.0
    },
    

},{
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    },
    timestamps : true
});


const Product = mongoose.model("Product",productSchema);

module.exports = Product;