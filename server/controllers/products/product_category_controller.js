const product_category = require('../../models/Products/product_category');

exports.getAll = async (req,res) =>{
    try {
        const Product_C = await product_category.findAll();
        res.status(200).json(Product_C);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
        const {id} = req.params
        const Product_C = await product_category.findOne({where:{id:id}});
        res.status(200).json(Product_C);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.create = async (req,res) =>{
    try {
        const {commerce_category_id, product_id} = req.body
        const Product_C = await product_category.create({
            commerce_category_id:commerce_category_id,
            product_id:product_id
        });
        res.status(200).json(Product_C)
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params
        const {commerce_category_id, product_id} = req.body
        const Product_C = await product_category.update({
            commerce_category_id:commerce_category_id,
            product_id:product_id
        },
        {where:{id:id}});
        res.status(200).json(Product_C)
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params
        const Product_C = await product_category.destroy({where:{id:id}});
        res.status(200).json(Product_C);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


