'use strict';

const Koa = require('koa');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./routes/api');
const config = require('../config');
const configResolver = require('../config/configResolver');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = new Koa();
const configResolve = configResolver(config);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
// logger
app.use(loggerMiddleware());
// routes
app.use(router.routes());
// error-handling
app.on('error', (err, ctx) => {
  // eslint-disable-next-line no-console
  console.error('server error', err, ctx);
});

app.listen(configResolve('PORT') || 5000);

module.exports = app;
