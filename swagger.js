const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

const { PORT, HOST, ENV_MODE } = process.env;

dotenv.config();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.js'];
const doc = {
  info: {
    version: '1.0.0',
    title: 'URL_SHORTENER API',
    description: 'URL_SHORTENER API documentation',
  },
  host: `${ENV_MODE === 'DEV' ? 'localhost' : HOST}:${PORT}`,
  basePath: '/api/v1/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'User authentication and authorization',
    },
  ],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  definitions: {
    User: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'john@123',
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Docs generation finished');
});
