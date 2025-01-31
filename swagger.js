const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kitchen Harmony API',
      version: '1.1.0',
      description: 'Retrive information about Kitchen Harmony.',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;