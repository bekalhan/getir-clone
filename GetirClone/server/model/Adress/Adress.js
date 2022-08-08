const mongoose = require('mongoose');

const adressSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description :{
        type:String,
        required : true
    },
});

const Adress = mongoose.model("Adress",adressSchema);

module.exports = Adress;

