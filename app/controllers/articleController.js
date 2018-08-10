'use strict';

const db = require('../models');
const BaseController = require('./baseController');
const cache = require('../../cache');
const { articleAttributes } = require('../util/attributes');
const { asyncControllerWrapper } = require('../util/asyncWrapper');

const Article = db.article;

class articleController extends BaseController {
  constructor() {
    super();
    this.index = this.index.bind(this);
  }

  async index(ctx, next) {
    const limit = 20;
    let page = parseInt(ctx.query.page, 10) || 1;
    page = page > 0 ? page : 1;

    let articles = await cache.get('articles' + page);
    articles = JSON.parse(articles);

    if (!articles) {
      articles = await Article.findAll({
        attributes: articleAttributes,
        limit,
        offset: (page - 1) * limit,
        order: [['created_at', 'DESC']],
      });
      cache.set('articles' + page, JSON.stringify(articles), 10);
    }

    ctx.body = { success: true, data: articles };
  }
}

module.exports = asyncControllerWrapper(new articleController());
