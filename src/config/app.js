require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  services: {
    user: {
      url: process.env.USER_SERVICE_URL,
      timeout: parseInt(process.env.USER_SERVICE_TIMEOUT),
      headers: {
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET
      }
    },
    service: {
      url: process.env.SERVICE_URL,
      timeout: parseInt(process.env.SERVICE_TIMEOUT),
      headers: {
        'X-APP-TOKEN': process.env.APP_ID
      }
    }
  }
}; 