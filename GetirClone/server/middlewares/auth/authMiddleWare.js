const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../model/User/userSchema');

const authmiddleware = expressAsyncHandler(async (req,res,next)=>{
    let token;

    if(req?.headers.authorization?.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1];
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEYS);
                const user = await User.findById(decoded?.id).select("-password");
                req.user = user;
                next();
            }
        }catch(err){
            throw new Error("not authorized");
        }
    }
})

module.exports = authmiddleware;