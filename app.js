const express = require('express');
const authRouter = require('./routes/auth');
const analyticsRouter = require('./routes/analytics');
const categoryRouter = require('./routes/category');
const orderRouter = require('./routes/order');
const positionRouter = require('./routes/position');

/* initial express */
const app = express();

/* initial routes */
app.use('/api/auth', authRouter);
app.use('/api/auth', analyticsRouter);
app.use('/api/auth', categoryRouter);
app.use('/api/auth', orderRouter);
app.use('/api/auth', positionRouter);

module.exports = app;