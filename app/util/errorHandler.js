'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const { ConflictError, NotFoundException, ValidationException, DeleteAbortedWarning } = require('../exceptions');

const errorHandler = (ctx, extraInfo = undefined) => error => {
  const info = {
    success: false,
    errors: error.errors,
    name: error.name,
    message: error.message,
    stack: error.stack,
  };

  if (extraInfo) info.extraInfo = extraInfo;

  return Promise.reject(error)
    .catch(NotFoundException, error => 404)
    .catch(ValidationException, error => 412)
    .catch(ConflictError, error => 409)
    .catch(DeleteAbortedWarning, error => 204)
    .catch(error => 500)
    .then(code => {
      info.statusCode = code;
      console.error(info);
      const schema = _.omit(info, ['stack']);
      ctx.body = { code, error: schema };
    });
};

module.exports = errorHandler;
