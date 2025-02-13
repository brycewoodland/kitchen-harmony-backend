const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const routes = require('./routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Use consolidated routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});