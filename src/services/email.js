'use strict';

const config = require('../config');
const sendGrid = require('@sendgrid/mail');

sendGrid.setApiKey(config.sendGridKey);

exports.send = async (to, subject, body) => {
  sendGrid.send({
    to: to,
    from: 'ayrton.maradona@gmail.com',
    subject: subject,
    text: 'test',
    html: body
  });
};
