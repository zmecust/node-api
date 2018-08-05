import nconf from 'nconf';
import dotenv from 'dotenv';

// Read the .env file under root folder into process.env.
dotenv.config();
// nconf.env() will load all variables from process.env into nconf.
nconf.env().use('memory');

if (!nconf.get('NODE_ENV')) {
  nconf.set('NODE_ENV', 'development');
}

export default nconf;
