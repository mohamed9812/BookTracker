const cors = require('cors');

const setupCors = (app) => {
  app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true
  }));
};

module.exports = setupCors;