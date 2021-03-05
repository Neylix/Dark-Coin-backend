import { createServer } from 'http';
import app from './app.js';

// NormalizePort return a valid port
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
};

// Define listening port for Express app
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Error handler for server.listen()
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACESS':
      console.error(bind + ' requires elevated privilegs.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = createServer(app);

server.on('error', errorHandler);

// log that server is running
server.on('listening', () => {
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
