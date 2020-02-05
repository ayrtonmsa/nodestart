'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const product = new schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Obrigatorio'],
    trim: true,
    index: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  tags: [{
    type: String,
    required: true
  }],
  image: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Product', product);
