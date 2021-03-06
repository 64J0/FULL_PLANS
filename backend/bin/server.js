/* eslint-disable no-fallthrough */
// Neste trecho estão sendo chamadas as dependências necessárias para subir
// o servidor HTTP e realizar o  debug (procurar por erros).
const debug = require("debug")("nodestr:server");
const http = require("http");
const app = require("../src/app");

// PORT -> based on express-generator
function normalizePort(val) {
  // Converte para Integer na base decimal (10)
  const port = parseInt(val, 10);

  // eslint-disable-next-line
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || 3333);
app.set("port", port);

// Error handler
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);

    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);

    case "ELIFECYCLE":
      console.error("Process has been stopped unexpectedly.");
      process.exit(1);

    default:
      throw error;
  }
}

// Server
const server = http.createServer(app);

// Listener handler
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log(`API is running on port: ${port}!`);
