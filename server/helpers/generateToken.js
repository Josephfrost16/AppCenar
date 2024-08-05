
const jwt = require('jsonwebtoken');

exports.SignToken = (user,secret,rol) =>{
    return jwt.sign({
        id: user.id,
        username: user.name,
        email: user.email,
        role: rol,
        iat: new Date().getTime(),
        exp: new Date().getTime() + 60 *1000 
    }, secret);
}