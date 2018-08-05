'use strict';

const config = require('../config');
const resolveConfig = require('./configResolver')(config);

const redisConfig = {
  host: resolveConfig('REDIS_HOST') || 'localhost',
  port: resolveConfig('REDIS_PORT') || '6379',
  db: resolveConfig('REDIS_DB') || 0,
  password: resolveConfig('REDIS_PASSWORD') || '',
};

module.exports = redisConfig;
