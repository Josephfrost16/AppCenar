const directions = require('../../models/other/direction');

exports.getAll = async (req,res) =>{
    try {
        const direction = await directions.findAll();
        res.status(200).json(direction);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
        const {id} = req.params
        const direction = await directions.findOne({where:{id:id}});
        res.status(200).json(direction);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getByUser = async (req,res) =>{
    try {
        const {id} = req.params
        const direction = await directions.findAll({where:{user_id:id}});
        res.status(200).json(direction);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.create = async (req,res) =>{
    try {
        const {location,description,user_id} = req.body
        const direction = await directions.create({location:location,
            description:description,
            user_id:user_id});
        res.status(200).json(direction);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params
        const {location,description,user_id} = req.body
        const direction = await directions.update({location:location,
            description:description,
            user_id:user_id},
            {where:{id:id}});
        res.status(200).json(direction);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params
        const direction = await directions.destroy({where:{id:id}});
        res.status(200).json(direction);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


