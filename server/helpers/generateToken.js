const jwt = require('jsonwebtoken');

exports.SignToken = (user,secret,rol) =>{
    return jwt.sign({
        id: user.id,
        username: user.name,
        email: user.email,
        role: rol
        // HoraCreacion: new Date().getTime(),
        // exp: new Date().getTime() + 60 *5000  // 5 minutos
    }, secret);
}

exports.validateToken = (req,res,next) =>{
const accessToken = req.headers['authorization'] || req.query.accessToken;
if(!accessToken){
    return res.status(401).json({message:'Access denied'});
}
    jwt.verify(accessToken,process.env.secret,(err,user) =>{
    if(err){
        return res.status(403).json({message:'Access denied, token expired or incorrect'});
    }else{
        req.user = user;
        next();
    }
})
}