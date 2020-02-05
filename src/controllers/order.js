'use strict';

const repository = require('../repositories/order');
const guid = require('guid');
const authService = require('../services/auth');

exports.get = async (request, response, next) => {
  try {
    let result = await repository.get();
    response.status(200).send(result);
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};

exports.post = async (request, response, next) => {
  try {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    await repository.create({
      customer: data.id,
      number: guid.raw().substring(0, 6),
      items: request.body.items,
    });
    response.status(201).send({ message: 'cadastrado' });
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};
