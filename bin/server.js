'use strict';

const app = require('../src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta: ' + port);

function normalizePort(value) {
  const portAux = parseInt(value, 10);

  if (isNaN(portAux)) {
    return value;
  }

  if (portAux >= 0) {
    return portAux;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const address = server.address();
  const bind = typeof address === 'string' ? 'Pipe ' + address : 'Port ' + address.port;
  debug('Listening on  ' + bind);
}
