const Commerce = require('../../models/Commerce/commerce');

const Encryption = require('../../helpers/Encryption');

const TokenConfig =  require('../../helpers/generateToken');

const {sendMail,getTemplate} = require('../../helpers/mail_config');
const direction = require('../../models/other/direction');

const secret = process.env.secret;


exports.getAll = async (req,res) =>{
    try {
        const commerce = await Commerce.findAll();
        res.status(200).json(commerce);
        
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
         const {id} = req.params
         const commerce = await Commerce.findOne({where:{id:id}})
         res.status(200).json(commerce);

    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getByType = async (req,res) =>{
    try {
         const {id} = req.params
         const commerce = await Commerce.findAll({where:{commerceTypeId:id}})
         res.status(200).json(commerce);

    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getByName = async (req,res) =>{
    try {
        const {name} = req.params
        const commerce = await Commerce.findAll({where:{name:name}});
        res.status(200).json(commerce);
        
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


exports.create = async (req,res) =>{
    try {
        const {name,commerceTypeId,logo,banner,email,country,direccion,phone,zip,password} = req.body
        
        // Encriptacion de clave:
        const encryptedPassword = await Encryption.encrypt(password);
        
        // Chequeo de si existe el comercio:
        const check = await Commerce.findOne({where:{email}});

       if (check){
            return res.json({
                success: false,
                message: 'Ya existe un comercio con este email',
            })
        }

        const commerce = await Commerce.create({
            
            name:name,
            commerceTypeId:commerceTypeId,
            logo:logo,
            banner:banner,
            email:email,
            country:country,
            direction: direccion,
            phone:phone,
            zip:zip,
            password:encryptedPassword
            });

            res.status(200).json({success: true,
                commerce, message: 'registrado correctamente'});

    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params;
        const {name,commerceTypeId,logo,email,country,phone,zip,password} = req.body
        const commerce = await Commerce.update({
            name:name,
            commerceTypeId:commerceTypeId,
            logo:logo,
            email:email,
            country:country,
            phone:phone,
            zip:zip,
            password:password
            },{where:{id:id}});
        res.status(200).json(commerce);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params
        const commerce = await Commerce.destroy({where:{id:id}})
        res.status(200).json(commerce);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


