'use strict';

global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá <strong>{0}</strong>, seja bem vindo ao Node!';

module.exports = {
  connectionString: 'mongodb+srv://root:omara@nodestart-jlzw1.azure.mongodb.net/test?retryWrites=true&w=majority',
  sendGridKey: 'Chave do banco!',
  containerConnectionString: 'Chave da azure closure!',
};
