const swaggerUi = require('swagger-ui-express');
const swaggerJSdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: "Babble API",
            version: "1.0.0",
            description: "API used for Babble's backend calls.",
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            }
        },
        openapi: "3.0.0",
    },
    apis: ['./routes/routes.js'],
};

const spec = swaggerJSdoc(options);

module.exports = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
}