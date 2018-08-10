'use strict';

// Configuration files to generate sequlizer db configuration based on current NODE ENV
// Refer to https://github.com/sequelize/cli#configuration-file
const config = require('../config');
const configResolver = require('./configResolver');

const env = config.get('APP_ENV');
const resolveConfig = configResolver(config);
const dbConfig = {};

// Reading .env varaiables from nconf to setup the db params
dbConfig[env] = {
  username: resolveConfig('DB_USERNAME') || 'laravue',
  password: resolveConfig('DB_PASSWORD') || 'laravue',
  database: resolveConfig('DB_DATABASE') || 'laravue',
  host: resolveConfig('DB_HOST') || 'localhost',
  port: parseInt(resolveConfig('DB_PORT'), 10),
  dialect: resolveConfig('DB_CONNECTION') || 'mysql',
  pool: {
    max: parseInt(resolveConfig('DB_POOL'), 10) || 5,
    min: 0,
    idle: 10000,
  },
  logging: console.log,
};

module.exports = dbConfig;
