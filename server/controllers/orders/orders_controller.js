const orders = require('../../models/Orders/orders');

exports.getAll = async (req,res) =>{
    try {
        const Orders = await orders.findAll();
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.getById = async (req,res) =>{
    try {
        const {id} = req.params
        const Orders = await orders.findOne({where:{id:id}});
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.create = async (req,res) =>{
    try {
        const {user_id,direction_id,subtotal,total,state} = req.body;
        const Orders = await orders.create({
            user_id:user_id,
            direction_id:direction_id,
            subtotal:subtotal,
            total:total,
            state:state
        });
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.update = async (req,res) =>{
    try {
        const {id} = req.params
        const {user_id,direction_id,subtotal,total,state} = req.body;
        const Orders = await orders.update({
            user_id:user_id,
            direction_id:direction_id,
            subtotal:subtotal,
            total:total,
            state:state
        },{where:{id:id}});
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id} = req.params
        const Orders = await orders.destroy({where:{id:id}});
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json({'error':error});
    }
}


