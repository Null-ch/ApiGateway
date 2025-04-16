const axios = require('axios');

class HealthCheck {
  constructor() {
    this.checks = [];
  }

  addCheck(name, check) {
    this.checks.push({ name, check });
  }

  async runChecks() {
    const results = {};
    for (const { name, check } of this.checks) {
      try {
        results[name] = await check();
      } catch (error) {
        results[name] = {
          status: 'error',
          error: error.message
        };
      }
    }
    return results;
  }

  init(app) {
    this.addCheck('service', async () => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      };
    });

    this.addCheck('userService', async () => {
      try {
        const start = Date.now();
        const response = await axios.get(process.env.USER_SERVICE_URL);
        const responseTime = Date.now() - start;
        
        return {
          status: response.status === 200 ? 'ok' : 'error',
          url: process.env.USER_SERVICE_URL,
          responseTime: `${responseTime}ms`
        };
      } catch (error) {
        return {
          status: 'error',
          error: error.message
        };
      }
    });

    this.addCheck('service', async () => {
      try {
        const start = Date.now();
        const response = await axios.get(process.env.SERVICE_URL);
        const responseTime = Date.now() - start;
        
        return {
          status: response.status === 200 ? 'ok' : 'error',
          url: process.env.SERVICE_URL,
          responseTime: `${responseTime}ms`
        };
      } catch (error) {
        return {
          status: 'error',
          error: error.message
        };
      }
    });

    app.get('/health', async (req, res) => {
      const results = await this.runChecks();
      const isHealthy = Object.values(results).every(result => result.status === 'ok');
      
      res.status(isHealthy ? 200 : 503).json({
        status: isHealthy ? 'ok' : 'error',
        checks: results
      });
    });
  }
}

module.exports = new HealthCheck(); 