const { where } = require('sequelize');
const orders_details = require('../../models/Orders/orders_details');

exports.getAll = async (req,res) =>{
    try {
        const Orders_D = await orders_details.findAll();
        res.status(200).json(Orders_D);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
        const {id} = req.params;
        const Orders_D = await orders_details.findOne({where:{id:id}});
        res.status(200).json(Orders_D);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.create = async (req,res) =>{
    try {
        const {product_id, orders_id} = req.body;
        const Orders_D = await orders_details.create({
            product_id:product_id,
            orders_id:orders_id
        });
        res.status(200).json(Orders_D);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params;
        const {product_id, orders_id} = req.body;
        const Orders_D = await orders_details.update({
            product_id:product_id,
            orders_id:orders_id
        },
        {where:{id:id}}
    );
        res.status(200).json(Orders_D);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params;
        const Orders_D = await orders_details.destroy({where:{id:id}});
        res.status(200).json(Orders_D);        
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


