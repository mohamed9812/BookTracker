const cors = require('cors');

const setupCors = (app) => {
  app.use(cors({
    origin: ['*'],
    credentials: true
  }));
};

module.exports = setupCors;