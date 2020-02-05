'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
};

exports.decodeToken = async (token) => {
  return await jwt.verify(token, global.SALT_KEY);
};

exports.authorize = function (request, response, next) {
  let token = request.body.token || request.query.token || request.headers['x-access-token'];
  if (!token) {
    response.status(401).json({
      message: 'Acesso Restrito!'
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        response.status(401).json({
          message: 'Token Inválido!'
        });
      } else {
        next();
      }
    });
  }
};

exports.isAdmin = function (request, response, next) {
  let token = request.body.token || request.query.token || request.headers['x-access-token'];
  if (!token) {
    response.status(401).json({
      message: 'Acesso Restrito!'
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        response.status(401).json({
          message: 'Token Inválido!'
        });
      } else {
        if (decoded.roles.includes(['admin'])) {
          next();
        } else {
          response.status(403).json({
            message: 'Esta funcionalidade é restrita para administradores'
          });
        }
      }
    });
  }
};
