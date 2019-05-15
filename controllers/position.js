const Position =  require('../models/Position')
const errorHeandler = require('../utils/errorHeandler')


/* Position  */
module.exports.getByCateoryId = async function(req, res) {
    try{
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(200).json(positions)

    } catch( error ) {
        // Error heandler
        errorHeandler(res, error);
    }
}

module.exports.create = async function(req, res) {
    try{
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(201).json(position)
    } catch( error ) {
        // Error heandler
        errorHeandler(res, error);
    }
}

module.exports.remove = async function(req, res) {
    try{
       await Position.remove({
           _id: req.params.id 
       }) 
       res.status(200).json({
           message: 'Position successfully deleted'
       })
    } catch( error ) {
        // Error heandler
        errorHeandler(res, error);
    }
}

module.exports.update = async function(req, res) {
    try{
        const Position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(position)
    } catch( error ) {
        // Error heandler
        errorHeandler(res, error);
    }
}

