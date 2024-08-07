const User = require('../../models/User/user');

const bcrypt = require('bcrypt');

const Encryption = require('../../helpers/Encryption');

const TokenConfig =  require('../../helpers/generateToken');

const {sendMail,getTemplate} = require('../../helpers/mail_config');

const secret = process.env.secret;

exports.getAll = async (req,res) =>{
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        console.error('get error', error);
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findOne({where:{id:id}});
        res.status(200).json(user);

    } catch (error) {
        console.error('get error', error)
        res.status(500).json({'error':error});
    }
}

// Metodo de registros de usuario
exports.create = async (req,res) =>{
    try {
        const {name, lastName, accountType, photo, email, country, phone,zip,password} = req.body;

        // Encriptacion de clave:
        const encryptedPassword = await Encryption.encrypt(password);
        
        const check = await User.findOne({where:{email}});

        if (check){
            return res.json({
                success: false,
                message: 'Ya existe un usuario con este email',
            })
        }

        const user = await User.create({
            name: name,
            lastName:lastName,
            accountType:accountType,
            photo:photo,
            email:email,
            country:country,
            phone:phone,
            zip:zip,
            password:encryptedPassword,
            // resetToken: token
          });


        res.status(200).json({success: true,
            user,msg: 'registrado correctamente'});

    } catch (error) {
        console.error('create error', error)
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params;
        const {name, lastName, accountType, photo, email, country, phone,zip,password} = req.body;
        const user = await User.update(
            {
                name:name,
                lastName:lastName,
                accountType:accountType,
                photo:photo,
                email:email,
                country:country,
                phone:phone,
                zip:zip,
                password:password
              },
              {where:{
                id:id
              }}
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.destroy({where:{id:id}});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.confirm = async (req,res)=>{
try{
    // Obtener el token
    const {token} = req.params;
    // Verificar la data
    const data =  TokenConfig.GetTokenData(token);
    
    if(data === null){
        return res.json({
            success: false,
            message: 'Error al obtener data',
            data: data
        })
    }

    // Obtencion de la data del token.
    console.log(data);

    const {email} = data;

    // Verificar la existencia del usuario
    
    const user = await User.findOne({where:{email}}) || null;

    if (user === null){
        return res.json({
            success: false,
            message: 'Usuario no encontrado'
        })
    }
    console.log({'token':token, 'token de usuario': user.resetToken});
    // Verificar el secret
    if (token !== user.resetToken){
        return res.json({
            success: false,
            message: 'Token invalido'
        })
    }
    // Actualizar usuario
    user.state = 1;
    await user.save();

    // Redireccionar a la confirmacion en el client
    res.status(200).json({
        success: true,
        message: 'Usuario confirmado con éxito',
    });
}catch(err){
    console.log(err);
}
}




