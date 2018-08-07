'use strict';

const moment = require('moment');

module.exports = () => async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  // eslint-disable-next-line no-console
  console.log(`${moment().format()} | ${ctx.method} ${ctx.url} - ${ms}ms`);
};
