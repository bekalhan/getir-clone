const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_KEYS,{expiresIn : '10d'})
}

module.exports = generateToken;