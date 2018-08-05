'use strict';

const redis = require('redis');
const { promisify } = require('util');
const redisConfig = require('../config/redisConfig');
const cacheConfig = require('../config/cacheConfig');

const redisClient = redis.createClient(redisConfig);
const getAsync = promisify(redisClient.get).bind(redisClient);
// bluebird.promisifyAll(redis);

class redisCache {
  async get(key) {
    return await getAsync(key);
  }

  async set(key, value, duration = cacheConfig.ttl) {
    redisClient.set(key, value, 'EX', duration);
    return await getAsync(key);
  }

  delete(key) {

  }
}

module.exports = new redisCache();