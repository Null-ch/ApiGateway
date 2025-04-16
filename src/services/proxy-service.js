const axios = require('axios');
const UrlUtils = require('../utils/url');
const LoggerMiddleware = require('../middleware/logger');
const config = require('../config/app');

class ProxyService {
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.serviceConfig = config.services[serviceName];
  }

  async proxyRequest(req, res) {
    try {
      const targetUrl = req.url.replace(`/api/v1/${this.serviceName}`, '');
      const fullUrl = UrlUtils.buildFullUrl(this.serviceConfig.url, targetUrl);

      // Формируем заголовки запроса
      const headers = {
        ...req.headers,
        ...this.serviceConfig.headers, // Специфичные заголовки для конкретного сервиса
        'host': new URL(this.serviceConfig.url).host
      };

      const proxyRequest = {
        method: req.method,
        url: fullUrl,
        data: req.body,
        headers,
        timeout: this.serviceConfig.timeout,
        validateStatus: () => true
      };

      LoggerMiddleware.logProxyRequest(
        fullUrl,
        proxyRequest.method,
        proxyRequest.headers,
        proxyRequest.data
      );

      const response = await axios(proxyRequest);

      LoggerMiddleware.logServiceResponse(
        fullUrl,
        response.status,
        response.headers,
        response.data
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      LoggerMiddleware.logError(error);
      res.status(500).json({
        error: error.message || 'Internal Server Error'
      });
    }
  }
}

module.exports = ProxyService; 