const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHeandler = require('../utils/errorHeandler')

/* Get all category */
module.exports.getAll = async function(req, res) {
    try{
        const categories = await Category.find({
            user: req.user.id
        })
        res.status(200).json(categories)
    }catch(error){
        errorHeandler(res, error)
    }
}
/*Get category by id  */
module.exports.getById = async function(req, res)  {
    try{
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    }catch(error){
        errorHeandler(res, error)
    }
}
/* Delete category */
module.exports.remove = async function(req, res)  {
    try{
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        res.status(200).json({
            message: 'Category deleted successfully'
        })
    }catch(error){
        errorHeandler(res, error)
    }

}
/* Create new category */
module.exports.create = async function(req, res)  {
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imgSrc: req.file ? req.file.path : ""
    })
    try{
        await category.save()
        res.status(201).json(category)
        
    }catch(error){
        errorHeandler(res, error)
    }
}
/* Update category info */
module.exports.update = async function(req, res)  {
    const updated = {
        name: req.body.name,
    }
    if(req.file){
        updated.imgSrc = req.file.path
    }
    try{
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {$new: true}
        )
        res.status(200).json(category)
        
    }catch(error){
        errorHeandler(res, error)
    }
}