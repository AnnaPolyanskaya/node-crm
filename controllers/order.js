/* Get all orders  */
module.exports.getAll = (req, res) => {
    res.status(200).json({
        message: "Get order"
    })
}
/* Create new order */
module.exports.create = (req, res) => {
    res.status(200).json({
        message: "Post order"
    })
}