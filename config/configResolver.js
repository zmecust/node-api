'use strict';

module.exports = config => key => {
  const env = config.get('APP_ENV') || 'development';
  //E.G.'DB_NAME_test, DB_NAME_development, DB_NAME_production',
  const envSpecificKey = `${key}_${env}`;
  return config.get(envSpecificKey) || config.get(key);
};
