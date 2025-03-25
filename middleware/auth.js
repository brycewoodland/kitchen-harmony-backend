const jwksClient = require('jwks-rsa');
const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();

// Create a JWKS client to fetch the signing key dynamically from Auth0
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`, // Ensure it's the correct domain
});

// Function to retrieve the signing key using the 'kid' from the JWT header
const getKey = (header, callback) => {
  // Retrieve the key using the kid (Key ID) from the JWT header
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err); // Handle error in key retrieval
    }
    const signingKey = key.publicKey || key.rsaPublicKey; // Use the public key or RSA public key
    callback(null, signingKey); // Return the key for validation
  });
};

// Middleware to verify the JWT
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,  // Your API Audience (set in .env)
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,  // Issuer URL (set in .env)
  tokenSigningAlg: 'RS256',  // Expect RS256 algorithm
  getPublicKey: getKey,  // The function that retrieves the public key
});

module.exports = checkJwt;  // Export the middleware
