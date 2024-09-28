const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); //! Import the Swagger JSON file that defines the API documentation

router.use('/api-docs', swaggerUi.serve); //! Middleware to serve the Swagger UI assets (CSS, JS, etc.) when visiting /api-docs

router.get('/api-docs', swaggerUi.setup(swaggerDocument)); //! Route to handle GET requests to /api-docs, showing the Swagger UI documentation using the specified JSON

module.exports = router;