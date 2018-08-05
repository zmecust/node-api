import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import routes from './routes';
import config from './config';
import configResolver from './config/configResolver';
import loggerMiddleware from './middlewares/loggerMiddleware';
import corsMiddleware from './middlewares/corsMiddleware';

const app = new Koa();
const configResolve = configResolver(config);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
// logger
app.use(loggerMiddleware);
// cors
app.use(corsMiddleware);
// routes
app.use(routes);
// error-handling
app.on('error', (err, ctx) => {
  // eslint-disable-next-line no-console
  console.error('server error', err, ctx);
});

app.listen(configResolve('PORT') || 5000);
