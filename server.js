const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const routes = require('./routes');
const session = require('express-session');
const { auth } = require('express-oauth2-jwt-bearer');

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

connectDB();

const jwtCheck = auth({
  audience: 'http://localhost:3000',  // Backend audience
  issuerBaseURL: 'https://dev-kuz06fnjpkyzr40v.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

app.get('/public', (req, res) => {
  res.json({ message: 'This is a public route, accessible to anyone.' });
});

app.get('/protected', jwtCheck, (req, res) => {
  res.json({ message: 'This is a protected route, accessible only with a valid token!' });
});

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Use consolidated routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
