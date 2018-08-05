'use strict';

const config = require('../config');
const resolveConfig = require('./configResolver')(config);

const DEFAULT_CACHE_TTL = 3600;

const cacheConfig = {
  driver: resolveConfig('CACHE_DRIVER') || 'redis', // redis/database/file/memcached/...
  stores: {
    redis: {
      host: resolveConfig('REDIS_HOST') || 'localhost',
      port: resolveConfig('REDIS_PORT') || '6379',
      db: resolveConfig('REDIS_DB') || 0,
      password: resolveConfig('REDIS_PASSWORD') || '',
      ttl: DEFAULT_CACHE_TTL,
    },
    database: {
      host: resolveConfig('DB_HOST') || 'localhost',
      port: parseInt(resolveConfig('DB_PORT'), 10),
      username: resolveConfig('DB_USERNAME') || 'laravue',
      password: resolveConfig('DB_PASSWORD') || 'laravue',
      table: 'laravue-cache',
    },
    file: {
      path: '',
    }
  }
};

module.exports = cacheConfig;
