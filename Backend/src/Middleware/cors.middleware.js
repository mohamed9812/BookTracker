const cors = require('cors');

const setupCors = (app) => {
  app.use(cors({
    origin: ['*', 'http://localhost:8081'],
    credentials: true
  }));
};

module.exports = setupCors;