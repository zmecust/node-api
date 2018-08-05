'use strict';

const cacheConfig = require('../config/cacheConfig');
const cache = require(`./${cacheConfig.store}Cache.js`);

module.exports = cache;
