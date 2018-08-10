'use strict';

const redis = require('redis');
const { promisify } = require('util');
const cacheConfig = require('../config/cacheConfig');

const cacheDriver = cacheConfig.driver;
const redisConfig = cacheConfig.stores[cacheDriver];

const redisClient = redis.createClient(redisConfig);
const getAsync = promisify(redisClient.get).bind(redisClient);
// bluebird.promisifyAll(redis);

class redisCache {
  async get(key) {
    return await getAsync(key);
  }

  set(key, value, duration = redisConfig.ttl) {
    redisClient.set(key, value, 'EX', duration);
  }

  delete(key) {}
}

module.exports = new redisCache();
