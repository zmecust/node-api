'use strict';

const nconf = require('nconf');
const dotenv = require('dotenv');

// Read the .env file under root folder into process.env.
dotenv.config();
// nconf.env() will load all variables from process.env into nconf.
nconf.env().use('memory');

if (!nconf.get('APP_ENV')) {
  nconf.set('APP_ENV', 'development');
}

module.exports = nconf;
