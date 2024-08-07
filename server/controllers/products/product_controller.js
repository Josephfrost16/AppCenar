const commerce_category = require('../../models/Commerce/commerce_category');
const product = require('../../models/Products/product');

exports.getAll = async (req,res) =>{
    try {
        const Product = await product.findAll();
        res.status(200).json(Product);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
        const {id} = req.params;
        const Product = await product.findOne({where:{id:id}});
        res.status(200).json(Product);
        
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getProductsByCommerce = async (req,res) =>{
    try {
        const {id} = req.params
        const categories = await commerce_category.findAll({
            where:{commerce_id:id},
            include:product
    });
        const products = categories.flatMap(category => category.products);
       res.status(200).json(products);

    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getProductsByCategories = async (req,res) =>{
    try {
        const {id} = req.params;
        const Product = await product.findAll({where:{category_id:id}});
        res.status(200).json(Product);
        
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.create = async (req,res) =>{
    try {
        const {name,image,description,price,category_id} = req.body;
        const Product = await product.create({
            name:name,
            image:image,
            description:description,
            price:price,
            category_id:category_id
        });
        res.status(200).json(Product);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params;
        const {name,image,description,price,category_id} = req.body;
        const Product = await product.update({
            name:name,
            image:image,
            description:description,
            price:price,
            category_id:category_id
        },
        {where:{id:id}}
    );
        res.status(200).json(Product);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params;
        const Product = await product.destroy({where:{id:id}});
        res.status(200).json(Product);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


