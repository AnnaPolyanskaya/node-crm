module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        error_message: error.error_message ? error.error_message : error
    })
}