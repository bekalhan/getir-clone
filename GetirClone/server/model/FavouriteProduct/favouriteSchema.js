const mongoose = require('mongoose');


const favoSchema = new mongoose.Schema({
    product:{
        type:Object,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
});

const Favourite = mongoose.model('Favourite', favoSchema);

module.exports = Favourite;