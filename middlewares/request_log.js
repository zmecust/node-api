import * as config from '../config/default'
import pathLib from 'path'
import log4js from 'log4js'

var env = process.env.NODE_ENV || "development"

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

var logger = log4js.getLogger('cheese');
//logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

export default (req, res, next) => {
  var t = new Date();
  logger.info('\n\nStarted', t.toISOString(), req.method, req.url, req.ip);

  res.on('finish', function () {
    var duration = ((new Date()) - t);

    logger.info('Completed', res.statusCode, ('(' + duration + 'ms)').green);
  });

  next();
};
