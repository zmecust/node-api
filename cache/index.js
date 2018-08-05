'use strict';

const cacheConfig = require('../config/cacheConfig');
const cache = require(`./${cacheConfig.driver}Cache.js`);

module.exports = cache;
