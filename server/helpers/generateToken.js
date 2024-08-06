const jwt = require('jsonwebtoken');

class TokenConfig {
    static SignToken(data, secret) {
      return jwt.sign(data, secret, { expiresIn: '1h' });
    }

    static VerifyToken(token, secret) {
        try {
          return jwt.verify(token, secret);
        } catch (err) {
          throw new Error('Invalid token');
        }
      }
    
}

module.exports = TokenConfig;
