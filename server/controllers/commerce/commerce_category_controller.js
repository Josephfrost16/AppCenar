const commerce_category = require('../../models/Commerce/commerce_category');

exports.getAll = async (req,res) =>{
    try {
        const Commerce_C = await commerce_category.findAll();
        res.status(200).json(Commerce_C);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
        const {id} = req.params;
        const Commerce_C = await commerce_category.findOne({where:{id:id}});
        res.status(200).json(Commerce_C)
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getCategoryByCommerce = async(req,res) =>{
    try {
        const {id} = req.params;
        const Commerce_C = await commerce_category.findAll({where:{commerce_id:id}});
        res.status(200).json(Commerce_C)
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.create = async (req,res) =>{
    try {
        const {name,commerce_id} = req.body
        const Commerce_C = await commerce_category.create({
            name:name,
            commerce_id:commerce_id
        });
        res.status(200).json(Commerce_C);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params;
        const {name} = req.body;
        const Commerce_C = await commerce_category.update({name:name},{where:{id:id}})
        res.status(200).json(Commerce_C);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params;
        const Commerce_C = await commerce_category.destroy({where:{id:id}});
        res.status(200).json(Commerce_C)
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


