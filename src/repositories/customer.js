'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.authenticate = async (data) => {
  return await Customer.findOne({
    email: data.email,
    password: data.password
  });
};

exports.get = async () => {
  return await Customer.find({});
};

exports.getBySlug = async (slug) => {
  return await Customer.findOne({
    active: true,
    slug: slug
  }, 'title description price slug tags');
};

exports.getById = async (id) => {
  return await Customer.findById(id);
};

exports.getByTag = async (tag) => {
  return await Customer.find({
    tags: tag,
    active: true
  }, 'title description price slug tags');
};

exports.create = async (data) => {
  let customer = new Customer(data);
  return await customer.save();
};

exports.update = async (id, data) => {
  return await Customer.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
    }
  });
};

exports.delete = async (id) => {
  return await Customer.findOneAndRemove(id);
};
