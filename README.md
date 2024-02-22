# URLSHORTENER API

The project follows [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for code formatting & styling. All necessary packages are installed with the project to help you follow the guideline in writing code.

In addition to the packages you're going to need the following extension installed in your vscode.

1. [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) For linting and styling.
2. [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) For testing.

# Requirements for running this app
> Create the .env file and add the following variables:
1. PORT
2. JWT_SECRET_KEY
3. MONGODB_PROD
4. MONGODB_DEV
5. ENV_MODE
6. FE_HOST

To setup the dev environment run

> `$ npm install`

To run the node (auto-refresh)

> `$ npm run start`

To run unit tests in the project (auto-refresh)
> `$ npm run test`

For other scripts please refer [package.json](./package.json) in the root folder of the project.