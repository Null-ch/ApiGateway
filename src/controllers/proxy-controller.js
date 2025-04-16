const ProxyService = require('../services/proxy-service');

class ProxyController {
  constructor() {
    this.userService = new ProxyService('user');
    this.serviceService = new ProxyService('service');
  }

  handleUserRequest(req, res) {
    return this.userService.proxyRequest(req, res);
  }

  handleServiceRequest(req, res) {
    return this.serviceService.proxyRequest(req, res);
  }
}

module.exports = new ProxyController(); 