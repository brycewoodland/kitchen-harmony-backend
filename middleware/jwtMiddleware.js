const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: "https://kitchen-harmony-api",
  issuerBaseURL: "https://dev-kuz06fnjpkyzr40v.us.auth0.com",
  tokenSigningAlg: "RS256"
});

module.exports = jwtCheck;
