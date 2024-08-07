const User = require('../../models/User/user');
const Commerce = require('../../models/Commerce/commerce');


const Encryption = require('../../helpers/Encryption');

// Clave maestra :
const secret = process.env.secret;

const TokenConfig = require('../../helpers/generateToken');

exports.generateToken = async (req,res)=>{

    try{
    // Obtener usuario especifico:
    const { email, password } = req.body;
    let rol = '';

    const user = await User.findOne({where:{email}});
    const commerce = await Commerce.findOne({where:{email}});


    if(!user && !commerce){
       return res.status(404).json({'error':'User not found'});
    }

    if (user){
        if (user.accountType === 1){
            rol = 'Admin'
        }else if(user.accountType === 2){
            rol = 'Cliente'
        }else{
            rol = 'Repartidor'
        }
        // Verificar contraseña:
        const match = await Encryption.Compare(password, user.password);

        if(!match){
           return res.status(401).json({'error':'Incorrect password'});
        }

        const token =  TokenConfig.SignToken({user:user.toJSON(),rol}, secret);
        return res.status(200).send({"token": token});

    }
    else {
        rol = 'Commerce'

        const match = Encryption.Compare(password, commerce.password);
        if(!match){
           return  res.status(401).json({'error':'Incorrect password'});
        }

        const token = TokenConfig.SignToken({commerce:commerce.toJSON(),rol},secret);
        return res.status(200).send({"token": token});
    }

    }catch(err){
        console.error('getToken error', err);
        res.status(500).json({ 'error': 'Internal server error' });
    }
};




// exports.getCommerceToken = async (req,res)=>{

//     try{
//      // Obtener usuario especifico:
//     const { email, password } = req.body;
//     let rol = 'Commerce';

//     const commerce = await Commerce.findOne({where:{email}});
//     if(!commerce){
//         return res.status(404).json({'error':'User not found'});
//     }

//     // Verificar contraseña:
//     const match = await Encryption.Compare(password, commerce.password);
//     if(!match){
//         return res.status(401).json({'error':'Incorrect password'});
//     }

//     const token = jwt.sign({
//         sub: commerce.id,
//         role: rol,
//         email,
//         exp: Date.now() + 60 *1000,
//     },secret)
//     res.send({"token": token});

//     }catch(err){
//         console.error('getToken error', err);
//     }
// };

// exports.getByEmail = async (req,res) =>{
//     try {
//         const {id} = req.params;
//         const user = await User.findOne({where:{id:id}});
//         res.status(200).json(user);

//     } catch (error) {
//         console.error('get error', error)
//         res.status(500).json({'error':error});
//     }
// }






