// Configuration files to generate sequlizer db configuration based on current NODE ENV
// Refer to https://github.com/sequelize/cli#configuration-file
import config from '../config';
import configResolver from './configResolver';

const env = config.get('NODE_ENV');
const resolveConfig = configResolver(config);
const dbConfig = {};

// Reading .env varaiables from nconf to setup the db params
dbConfig[env] = {
  username: resolveConfig('DB_USERNAME') || 'laravue',
  password: resolveConfig('DB_PASSWORD') || 'laravue',
  database: resolveConfig('DB_DATABASE') || 'laravue',
  host: resolveConfig('DB_HOST') || 'localhost',
  port: parseInt(resolveConfig('DB_PORT'), 10),
  dialect: 'mysql',
  pool: {
    max: parseInt(resolveConfig('DB_POOL'), 10) || 5,
    min: 0,
    idle: 10000
  },
  logging: console.log()
};

export default dbConfig;
