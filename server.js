const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/index');
const { auth } = require('express-openid-connect');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const routes = require('./routes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());

connectDB();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.baseURL || 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}.com`
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Use consolidated routes
app.use('/', routes);

// Public route
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});