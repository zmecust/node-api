'use strict';

const db = require('../models');
const BaseController = require('./baseController');
const cache = require('../../cache');

const Article = db.article;

class articleController extends BaseController {
  constructor() {
    super();
    this.index = this.index.bind(this);
  }

  async index(ctx, next) {
    let data = await cache.get('zhangmin');
    if (!data) {
      data = await cache.set('zhangmin', 'zhangmin', 10);
    }
    ctx.body = { data };
  }
}

module.exports = new articleController();
