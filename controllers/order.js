const Order = require('../models/Order')
const errorHeandler = require('../utils/errorHeandler')


/* Get all orders  */
module.exports.getAll = async (req, res) => {
    const query = {
        user: req.user.id
    }

    if(req.query.start){
        query.date = {
            // equal or greater
            $gte
        }
    }

    if(req.query.end){
        if(!req.query.date){
            query.date = {}   
        }
        query.date['$lte'] = req.query.end
    }

    if(req.query.order){
        query.order = +req.query.order
    }

    try{
        const orders = await Order
            .find(query)
            .sort({ date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
        res.status(200).json(orders)
    } catch(error) {
        errorHeandler(res, error)
    }
}
/* Create new order */
module.exports.create = async (req, res) => {
    try{
        const lastOrder = Order
            .findOne({user: req.user.id})
            .sort({date: -1})
        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
                list: req.bosy.list,
                user: req.user.id,
                order: maxOrder + 1
        }).save()
        res.status(201).json(order)
    } catch(error) {
        errorHeandler(res, error)
    }
}