const express = require("express");

const setupCors = require('./Middleware/cors.middleware');
const connectMongoDB = require("./Config/mongodb.config");
const cookieParser = require('cookie-parser');

// Define Routes
const auth = require('./Routes/auth.routes');
const user = require('./Routes/user.routes')

const app = express();
const port = process.env.PORT || 5000;

// Connect MongoDB
connectMongoDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Middleware
setupCors(app);

// Routes
app.use('api/auth', auth);
app.use('api/user', user);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

