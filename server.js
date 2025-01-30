const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/index');
const { auth, requiresAuth } = require('express-openid-connect');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'Vbmo6BgDc9vNo2cOPPwZAdI9CipKP4Mb',
  issuerBaseURL: 'https://dev-kuz06fnjpkyzr40v.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Public route
app.get('/', (req, res) => {
    res.send('Kitchen Harmony API is running!');
});

// Protected route
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});