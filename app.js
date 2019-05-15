const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

/* init express */
const app = express();

// connect MongpDB
mongoose.connect(keys.mongoUri)
    .then( () => {
        console.log('MongoDB connected')
    })
    .catch(error => {
        console.log(error)
    })

// passport init
app.use(passport.initialize())
require('./middleware/passport')(passport)

// morgan use
app.use(morgan('dev'));
// Returning img from localhost:5000/uploads/imgname.png
app.use('/uploads', express.static('uploads'))

// Cors use
app.use(cors());

// Body parcer
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* initial routes */
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth/category', categoryRoutes);
app.use('/api/auth/order', orderRoutes);
app.use('/api/auth/position', positionRoutes);

module.exports = app;