/**
 * Module dependencies.
 */
'use strict';

const Counter = require('passthrough-counter');
const humanize = require('humanize-number');
const bytes = require('bytes');
const chalk = require('chalk');
const util = require('util');

/**
 * Expose logger.
 */
module.exports = dev;

/**
 * Color map.
 */
const colorCodes = {
  7: 'magenta',
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green',
  0: 'yellow',
};

/**
 * Development logger.
 */
function dev(opts) {
  // print to console helper.
  const print = (function() {
    let transporter;
    if (typeof opts === 'function') {
      transporter = opts;
    } else if (opts && opts.transporter) {
      transporter = opts.transporter;
    }

    return function printFunc(...args) {
      let str = util.format(...args);
      if (transporter) {
        transporter(str, args);
      } else {
        console.log(...args);
      }
    };
  })();

  return async function logger(req, res, next) {
    // request
    const start = Date.now();
    print(
      '  ' +
        chalk.gray('<--') +
        ' ' +
        chalk.gray('[') +
        chalk.gray('%s') +
        chalk.gray(']') +
        ' ' +
        chalk.bold('%s') +
        ' ' +
        chalk.gray('%s'),
      new Date().toLocaleString(),
      req.method,
      req.originalUrl
    );

    try {
      next();
    } catch (err) {
      // log uncaught downstream errors
      log(print, req, res, start, err);
      throw err;
    }

    // log when the response is finished or closed,
    // whichever happens first.
    const onfinish = done.bind(null, 'finish');
    const onclose = done.bind(null, 'close');

    res.once('finish', onfinish);
    res.once('close', onclose);

    function done(event) {
      res.removeListener('finish', onfinish);
      res.removeListener('close', onclose);
      log(print, req, res, start, null, event);
    }
  };
}

/**
 * Log helper.
 */
function log(print, req, res, start, err, event) {
  // get the status code of the response
  const status = err ? (err.isBoom ? err.output.statusCode : err.status || 500) : res.statusCode || 404;

  // set the color of the status code;
  const s = (status / 100) | 0;
  const color = colorCodes.hasOwnProperty(s) ? colorCodes[s] : 0;

  // get the human readable response length
  let length;
  if (~[204, 205, 304].indexOf(status)) {
    length = '';
  } else if (res._contentLength === null) {
    length = '-';
  } else {
    length = bytes(res._contentLength).toLowerCase();
  }

  const upstream = err ? chalk.red('xxx') : event === 'close' ? chalk.yellow('-x-') : chalk.gray('-->');

  print(
    '  ' +
      upstream +
      ' ' +
      chalk.gray('[') +
      chalk.gray('%s') +
      chalk.gray(']') +
      ' ' +
      chalk.bold('%s') +
      ' ' +
      chalk.gray('%s') +
      ' ' +
      chalk[color]('%s') +
      ' ' +
      chalk.gray('%s') +
      ' ' +
      chalk.gray('%s'),
    new Date().toLocaleString(),
    req.method,
    req.originalUrl,
    status,
    time(start),
    length
  );
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */
function time(start) {
  const delta = Date.now() - start;
  return humanize(delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's');
}
