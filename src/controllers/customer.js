'use strict';

const ValidatorContract = require('../validators/validators');
const repository = require('../repositories/customer');
const md5 = require('md5');
const emailService = require('../services/email');
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

exports.getBySlug = async (request, response, next) => {
  try {
    let result = await repository.getBySlug(request.params.slug);
    response.status(200).send(result);
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};

exports.getById = async (request, response, next) => {
  try {
    let result = await repository.getById(request.params.id);
    response.status(200).send(result);
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};

exports.getByTag = async (request, response, next) => {
  try {
    let result = await repository.getByTag(request.params.tag);
    response.status(200).send(result);
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};

exports.post = async (request, response, next) => {
  let contract = new ValidatorContract();

  contract.hasMinLen(request.body.name, 3, 'O nome tem que ser maior que 3');
  contract.hasMinLen(request.body.email, 3, 'O email tem que ser maior que 3');
  contract.isEmail(request.body.email, 'O email tem que ser um email válido');
  contract.hasMinLen(request.body.password, 3, 'A senha tem que ser maior que 3');

  if (!contract.isValid()) {
    response.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      name: request.body.name,
      email: request.body.email,
      password: md5(request.body.password + global.SALT_KEY),
      roles: ['user']
    });

    emailService.send(
      request.body.email,
      'Bem vindo',
      global.EMAIL_TMPL.replace('{0}', request.body.name)
    );

    response.status(201).send({
      message: 'cadastrado'
    });
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};

exports.put = async (request, response, next) => {
  try {
    await repository.update(request.params.id, request.body);
    response.status(201).send({
      message: 'atualizado'
    });
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};

exports.delete = async (request, response, next) => {
  try {
    await repository.delete(request.body.id);
    response.status(201).send({
      message: 'deletado'
    });
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};

exports.authenticate = async (request, response, next) => {
  try {
    let customer = await repository.authenticate({
      email: request.body.email,
      password: md5(request.body.password + global.SALT_KEY)
    });

    if (!customer) {
      response.status(404).send({
        message: 'Usúario ou senha Invádios!'
      });
      return;
    }

    let token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name:customer.name,
      roles:customer.roles
    });

    response.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name:customer.name,
        roles:customer.roles
      }
    });
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};

exports.refreshToken = async (request, response, next) => {
  try {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);

    if (!customer) {
      response.status(404).send({
        message: 'Cliente não encontrado!'
      });
      return;
    }

    let tokenData = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name:customer.name,
      roles:customer.roles
    });

    response.status(201).send({
      token: tokenData,
      data: {
        email: customer.email,
        name:customer.name,
        roles:customer.roles
      }
    });
  } catch (e) {
    response.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};
