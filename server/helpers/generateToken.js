const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

class TokenConfig {
    static SignToken(data) {
      return jwt.sign(data, secret, { expiresIn: '1h' });
    }

    static GetTokenData(token) {
      let data = null;
      jwt.verify(token,secret,(err,decoded)=>{
        if(err) {
          console.log('Error al obtener data del token')
        };
        data = decoded;
      });
      return data;
    }

    static VerifyToken(token) {
        try {
          return jwt.verify(token, secret);
        } catch (err) {
          throw new Error('Invalid token');
        }
      }
    
}

module.exports = TokenConfig;
