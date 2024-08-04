const bcrypt = require('bcrypt');

// Logica de registro para encriptar la password:
exports.encrypt = async(password)=>{
    
    const EncryptedPassword = await bcrypt.hash(password,10);
    return EncryptedPassword;
}

// Logica de login para verificar la password
exports.Compare = async(password,EncryptedPassword)=>{
    const match = await bcrypt.compare(password,EncryptedPassword);
    return match;
}
