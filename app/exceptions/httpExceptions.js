'use strict';

/**
 * GenericError
 */
class GenericError extends Error {
  /**
   * GenericError constructor'
   *
   * @param  {String} detailDescription the error message to be returned.
   * @param  {Integer} errorInfo[i].code an integer standing for an error type.
   * @param  {String} errorInfo[i].title the title of the error.
   * @param  {String} errorInfo[i].detail the detail message of the error.
   * @param  {Array} errorInfo[i].models the relating model information as an array.
   * @param  {String} errorInfo[i].pattern a template string to generate the detail for an error type.
   * @param  {Array} errorInfo[i].args a list of arguments to fill in template string to generate the detail for an error type.
   *
   */
  constructor(detailDescription, errorInfo) {
    super(detailDescription);
    this.detailDescription = detailDescription;
    this.errors = errorInfo;
  }

  /**
   * formatDescription
   */
  formatDescription() {
    if (this.errors && this.errors[0]) this.detailDescription = this.errors[0].detail;
    if (this.detailDescription) this.message = this.detailDescription;
    return this;
  }
}

/**
 * NotFoundException
 */
class NotFoundException extends GenericError {
  /**
   * NotFoundException constructor'
   *
   * @param  {String} detailDescription the error message to be returned.
   * @param  {Integer} errorInfo[i].code an integer standing for an error type.
   * @param  {String} errorInfo[i].title the title of the error.
   * @param  {String} errorInfo[i].detail the detail message of the error.
   * @param  {Array} errorInfo[i].models the relating model information as an array.
   * @param  {String} errorInfo[i].pattern a template string to generate the detail for an error type.
   * @param  {Array} errorInfo[i].args a list of arguments to fill in template string to generate the detail for an error type.
   */
  constructor(detailDescription, errorInfo) {
    super(detailDescription, errorInfo);
  }
}

/**
 * ConflictError
 */
class ConflictError extends GenericError {
  /**
   * ConflictError constructor'
   *
   * @param  {String} detailDescription the error message to be returned.
   * @param  {Integer} errorInfo[i].code an integer standing for an error type.
   * @param  {String} errorInfo[i].title the title of the error.
   * @param  {String} errorInfo[i].detail the detail message of the error.
   * @param  {Array} errorInfo[i].models the relating model information as an array.
   * @param  {String} errorInfo[i].pattern a template string to generate the detail for an error type.
   * @param  {Array} errorInfo[i].args a list of arguments to fill in template string to generate the detail for an error type.
   */
  constructor(detailDescription, errorInfo) {
    super(detailDescription, errorInfo);
  }
}

/**
 * CircularConflictError
 */
class CircularConflictError extends ConflictError {
  /**
   * ConflictError constructor'
   *
   * @param  {String} detailDescription the error message to be returned.
   * @param  {Integer} errorInfo[i].code an integer standing for an error type.
   * @param  {String} errorInfo[i].title the title of the error.
   * @param  {String} errorInfo[i].detail the detail message of the error.
   * @param  {Array} errorInfo[i].models the relating model information as an array.
   * @param  {String} errorInfo[i].pattern a template string to generate the detail for an error type.
   * @param  {Array} errorInfo[i].args a list of arguments to fill in template string to generate the detail for an error type.
   */
  constructor(detailDescription, errorInfo) {
    super(detailDescription, errorInfo);
  }
}

/**
 * DeleteAbortedWarning
 */
class DeleteAbortedWarning extends GenericError {
  /**
   * DeleteAbortedWarning constructor'
   *
   * @param  {String} detailDescription the error message to be returned.
   * @param  {Integer} errorInfo[i].code an integer standing for an error type.
   * @param  {String} errorInfo[i].title the title of the error.
   * @param  {String} errorInfo[i].detail the detail message of the error.
   * @param  {Array} errorInfo[i].models the relating model information as an array.
   * @param  {String} errorInfo[i].pattern a template string to generate the detail for an error type.
   * @param  {Array} errorInfo[i].args a list of arguments to fill in template string to generate the detail for an error type.
   */
  constructor(detailDescription, errorInfo) {
    super(detailDescription, errorInfo);
  }
}

/**
 * DuplicatedException
 */
class DuplicatedException extends ConflictError {
  /**
   * DuplicatedException constructor'
   *
   * @param  {String} detailDescription the error message to be returned.
   * @param  {Integer} errorInfo[i].code an integer standing for an error type.
   * @param  {String} errorInfo[i].title the title of the error.
   * @param  {String} errorInfo[i].detail the detail message of the error.
   * @param  {Array} errorInfo[i].models the relating model information as an array.
   * @param  {String} errorInfo[i].pattern a template string to generate the detail for an error type.
   * @param  {Array} errorInfo[i].args a list of arguments to fill in template string to generate the detail for an error type.
   */
  constructor(detailDescription, errorInfo) {
    super(detailDescription, errorInfo);
  }
}

/**
 * ValidationException
 */
class ValidationException extends GenericError {
  /**
   * ValidationException constructor'
   *
   * @param  {String} detailDescription the error message to be returned.
   * @param  {Integer} errorInfo[i].code an integer standing for an error type.
   * @param  {String} errorInfo[i].title the title of the error.
   * @param  {String} errorInfo[i].detail the detail message of the error.
   * @param  {Array} errorInfo[i].models the relating model information as an array.
   * @param  {String} errorInfo[i].pattern a template string to generate the detail for an error type.
   * @param  {Array} errorInfo[i].args a list of arguments to fill in template string to generate the detail for an error type.
   */
  constructor(detailDescription, errorInfo) {
    super(detailDescription, errorInfo);
  }
}
module.exports = {
  ValidationException,
  NotFoundException,
  ConflictError,
  CircularConflictError,
  DuplicatedException,
  DeleteAbortedWarning,
};
