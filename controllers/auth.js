const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')

const User = require('../models/User')    
const keys = require('../config/keys')
const errorHeandler =  require('../utils/errorHeandler')
/* Login controller */
module.exports.login = async function(req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    })

    if(candidate){
        // exist user -> try password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if(passwordResult){
            // Generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60})
            // Success login
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Password does not match
            res.status(401).json({
                error_message: "Email or password is incorrect"
            })
        }
    } else {
        // user does not exist
        res.status(404).json({
            error_message: "User does not exist"
        })
    }
}

/* register controller */
module.exports.register = async function(req, res) {
   const candidate = await User.findOne({
       email: req.body.email
   })

   if(candidate){
        // user already exist
        res.status(409).json({
            error_message: "This email already exist"
        })
   } else {
       // pasword secure
       const salt = bcrypt.genSaltSync(10)
       const password = req.body.password
       // create user
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        
        try{
           await user.save() 
           res.status(200).json(user)
        } catch (error) {
            // Recieve error
            errorHeandler(res, error)
        }
        
   } 
}