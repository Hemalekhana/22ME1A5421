

const fs = require('fs');
const path = require('path');

function log(stack, level, packageName, message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [${packageName}] ${message}`;

  fs.appendFileSync(path.join(__dirname, 'server.log'), logMessage + '\n');
}

function logger(req, res, next) {
  const message = `${req.method} ${req.url}`;
  log("MiddlewareStack", "info", "Logger", message);
  next();
}

module.exports = { logger, log };

