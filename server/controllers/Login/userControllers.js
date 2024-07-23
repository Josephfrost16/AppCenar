const User = require('../../models/Login/user');

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

exports.create = async (req,res) =>{
    try {
        const {name, lastName, accountType, photo, email, country, phone,zip,password} = req.body;
        const user = await User.create({
          name:name,
          lastName:lastName,
          accountType:accountType,
          photo:photo,
          email:email,
          country:country,
          phone:phone,
          zip:zip,
          password:password
        });
        res.status(200).json(user);
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





