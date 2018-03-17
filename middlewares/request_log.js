'use strict'

import * as config from '../config/default'
import pathLib from 'path'
import log4js from 'log4js'

//let env = process.env.NODE_ENV || "development"

// log4js.configure({
//   appenders: [
//     { type: 'console' },
//     { type: 'file', filename: pathLib.join(config.log_dir, 'cheese.log'), category: 'cheese' }
//   ]
// });

log4js.configure({
  appenders: { cheese: { type: 'file', filename: pathLib.join(config.log_dir, 'cheese.log') } },
  categories: { default: { appenders: ['cheese'], level: 'info' } }
});

let logger = log4js.getLogger('cheese');
//logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

export default (req, res, next) => {
  let t = new Date();
  logger.info('Started', t.toISOString(), req.method, req.url, req.ip);

  res.on('finish', function () {
    let duration = ((new Date()) - t);
    logger.info('Completed', res.statusCode, ('(' + duration + 'ms)'), '\n');
  });

  next();
};
