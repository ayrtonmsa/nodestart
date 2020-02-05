'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

mongoose.connect(
  config.connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({extended: false}));

// CORS
app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Routes
const indexRoute = require('./routes/index');
const productRoute = require('./routes/product');
const customerRoute = require('./routes/customer');
const orderRoute = require('./routes/order');

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;
