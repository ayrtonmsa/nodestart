'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const order = new schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  number: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'done'],
    default: 'created'
  },
  items: [{
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }]
  // items: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Customer'
  // }]
});

module.exports = mongoose.model('Order', order);
