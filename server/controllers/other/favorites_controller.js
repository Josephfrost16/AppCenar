const favorites = require('../../models/other/favorites');

exports.getAll = async (req,res) =>{
    try {
        const Favorites = await favorites.findAll()
        res.status(200).json(Favorites);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
        const {id} = req.params
        const Favorites = await favorites.findOne({where:{id:id}})
        res.status(200).json(Favorites);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.create = async (req,res) =>{
    try {
        const {user_id,commerce_id} = req.body;
        const Favorites = await favorites.create({user_id:user_id,commerce_id:commerce_id})
        res.status(200).json(Favorites);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params;
        const {user_id,commerce_id} = req.body;
        const Favorites = await favorites.update({user_id:user_id,commerce_id:commerce_id},{where:{id:id}})
        res.status(200).json(Favorites);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params
        const Favorites = await favorites.destroy({where:{id:id}})
        res.status(200).json(Favorites);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


