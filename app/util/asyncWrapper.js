'use strict';

const errorHandler = require('./errorHandler');

const getFunctions = service => {
  return [...Object.getOwnPropertyNames(service), ...Object.getOwnPropertyNames(Object.getPrototypeOf(service))].filter(
    name => name !== 'constructor' && typeof service[name] === 'function'
  );
};

const asyncWrapper = asyncMiddleware => (ctx, next) => {
  return asyncMiddleware(ctx, next).catch(errorHandler(ctx));
};

const asyncControllerWrapper = controllerObject => {
  const methodsOrClassMethods = getFunctions(controllerObject);

  const wrapped = methodsOrClassMethods.reduce((result, key) => {
    result[key] = asyncWrapper(controllerObject[key]);
    return result;
  }, {});

  return wrapped;
};

module.exports = { asyncWrapper, asyncControllerWrapper };
