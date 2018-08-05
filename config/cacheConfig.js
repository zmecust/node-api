'use strict';

const redisConfig = require('./redisConfig');

const MAX_CACHE_SIZE = 10000;
const DEFAULT_CACHE_TTL = 3600;

const cacheConfig = {
  store: 'redis',
  port: redisConfig.port,
  host: redisConfig.host,
  db: redisConfig.db,
  max: MAX_CACHE_SIZE,
  ttl: DEFAULT_CACHE_TTL,
};

module.exports = cacheConfig;
