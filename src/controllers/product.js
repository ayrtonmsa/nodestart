'use strict';

const ValidatorContract = require('../validators/validators');
const repository = require('../repositories/product');
const azure = require('azure-storage');
const config = require('../config');
const guid = require('guid');

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

  contract.hasMinLen(request.body.title, 3, 'O titulo tem que ser maior que 3');
  contract.hasMinLen(request.body.slug, 3, 'O slug tem que ser maior que 3');
  contract.hasMinLen(request.body.description, 3, 'O description tem que ser maior que 3');

  if (!contract.isValid()) {
    response.status(400).send(contract.errors()).end();
    return;
  }

  try {
    // const blobService = azure.createBlobService(config.containerConnectionString);
    //
    let filename = guid.raw().toString() + '.jpg';
    // let rawData = request.body.image;
    // let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // let type = matches[1];
    // let buffer = new Buffer(matches[2], 'base64');
    //
    // await blobService.createBlockBlobFromText('product-images', filename, buffer, {contentType: type},
    //   function (error, result, response) {
    //     if (error) {
    //       filename = 'default-product.png'
    //     }
    //   });

    await repository.create({
      title: request.body.title,
      slug: request.body.slug,
      description: request.body.description,
      price: request.body.price,
      active: true,
      tags: request.body.tags,
      image: 'https://nodestart.blob.core.windows.net/product-images/' + filename,
    });
    response.status(201).send({
      message: 'cadastrado'
    });
  } catch (e) {
    response.status(500).send({
      error: e,
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
