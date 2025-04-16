require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/app');
const LoggerMiddleware = require('./middleware/logger');
const proxyController = require('./controllers/proxy-controller');
const healthcheck = require('./config/healthcheck');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(LoggerMiddleware.logRequest);

healthcheck.init(app);

app.use('/api/v1/user', proxyController.handleUserRequest.bind(proxyController));
app.use('/api/v1/service', proxyController.handleServiceRequest.bind(proxyController));

app.use((err, req, res, next) => {
  LoggerMiddleware.logError(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(config.port, () => {
  console.log(`CoreMobileGateway launched on the port: ${config.port}`);
}); 