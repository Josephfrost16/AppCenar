const User = require('../../models/User/user');

// const bcrypt = require('bcrypt');

const Encryption = require('../../helpers/Encryption');

const jwt = require('jsonwebtoken');

// Clave maestra :
const secret = process.env.secret;

exports.getToken = async (req,res)=>{

    try{
     // Obtener usuario especifico:
    const { email, password } = req.body;
    let rol = '';

    const user = await User.findOne({where:{email}});
    if(!user){
        return res.status(404).json({'error':'User not found'});
    }

    // Verificar contraseña:
    const match = await Encryption.Compare(password, user.password);
    if(!match){
        return res.status(401).json({'error':'Incorrect password'});
    }

    if (user.accountType== 1){
        rol = 'Admin'
    }else{
        rol = 'User'
    }

    const token = jwt.sign({
        sub: user.id,
        role: rol,
        email,
        exp: Date.now() + 60 *1000,
    },secret)
    res.send({"token": token});

    }catch(err){
        console.error('getToken error', err);
    }
};

exports.getByEmail = async (req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findOne({where:{id:id}});
        res.status(200).json(user);

    } catch (error) {
        console.error('get error', error)
        res.status(500).json({'error':error});
    }
}






