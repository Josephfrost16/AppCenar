const jwt = require('jsonwebtoken');

exports.SignToken = (user,secret,rol) =>{
    return jwt.sign({
        id: user.id,
        username: user.name,
        email: user.email,
        role: rol,
        HoraCreacion: new Date().getTime(),
        exp: new Date().getTime() + 60 *5000  // 5 minutos
    }, secret);
}