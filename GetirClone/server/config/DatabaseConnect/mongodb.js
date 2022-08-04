const mongoose = require('mongoose');

    try{
         mongoose.connect(process.env.MONGODB_URL,{
            useUnifiedTopology : true,
            useNewUrlParser : true
        });
        console.log("you have been connected to mongoose");
    }catch(error){
        console.log(error);
    }