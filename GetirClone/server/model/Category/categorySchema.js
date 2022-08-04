const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type : String,
       // required:true
       default:"a"
    },
    product : {
        type: Object
    },
    image : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2018/04/16/10/13/newspaper-3324168_960_720.jpg"
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;