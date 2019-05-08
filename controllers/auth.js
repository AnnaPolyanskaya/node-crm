/* Login controller */
module.exports.login = (req, res) => {
    res.status(200).json({
        login: true,
        message: 'Login from controller'
    })
}

/* register controller */
module.exports.register = (req, res) => {
    res.status(200).json({
        register: true,
        message: 'Register from  controller'
    })
}