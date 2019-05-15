const express = require('express')
const controller = require('../controllers/analytics')

const router  = express.Router()

router.get('/overview', controller.overview)
router.post('/analytics', controller.analytic)

module.exports = router;