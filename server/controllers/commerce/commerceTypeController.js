
const commerceType = require('../../models/Commerce/commerceType');

exports.getAll = async (req,res) =>{
    try {
        const Commerce_T = await commerceType.findAll();
        res.status(200).json(Commerce_T);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
        const {id} = req.params;
        const Commerce_T = await commerceType.findOne({where:{id:id}});
        res.status(200).json(Commerce_T);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.create = async (req,res) =>{
    try {
        const {type,icon} = req.body;
        const Commerce_T = await commerceType.create({
            type:type,
            icon:icon
        });
        res.status(200).json(Commerce_T);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params;
        const {type,icon} = req.body;
        const Commerce_T = await commerceType.update({type:type,icon:icon}, {where:{id:id}});
        res.status(200).json(Commerce_T);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params;
        const Commerce_T = await commerceType.destroy({where:{id:id}});
        res.status(200).json(Commerce_T);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


