const logger = require('../config/logger');

class LoggerMiddleware {
  static logRequest(req, res, next) {
    logger.info('Incoming request:', {
      type: 'incoming_request',
      source: req.ip,
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body
    });
    next();
  }

  static logProxyRequest(target, method, headers, body) {
    logger.info('Proxy request:', {
      type: 'proxy_request',
      target,
      method,
      headers,
      body
    });
  }

  static logServiceResponse(source, status, headers, data) {
    logger.info('Ответ от сервиса:', {
      type: 'service_response',
      source,
      status,
      headers,
      data
    });
  }

  static logError(error) {
    logger.error('Error:', {
      type: 'error',
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
  }
}

module.exports = LoggerMiddleware; 