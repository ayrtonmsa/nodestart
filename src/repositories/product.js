'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
  return await Product.find({active: true}, 'title price slug');
};

exports.getBySlug = async (slug) => {
  return await Product.findOne({
    active: true,
    slug: slug
  }, 'title description price slug tags');
};

exports.getById = async (id) => {
  return await Product.findById(id, 'title description price slug tags');
};

exports.getByTag = async (tag) => {
  return await Product.find({
    tags: tag,
    active: true
  }, 'title description price slug tags');
};

exports.create = async (data) => {
  let product = new Product(data);
  return await product.save();
};

exports.update = async (id, data) => {
  return await Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
    }
  });
};

exports.delete = async (id) => {
  return await Product.findOneAndRemove(id);
};
