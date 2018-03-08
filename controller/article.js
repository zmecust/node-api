'use strict';

import ArticleModel from '../models/article'
import UserModel from '../models/user'
import BaseController from './baseController'
import formidable from 'formidable'
import * as jwt from 'jwt-simple'
import * as config from '../config/default';
import EventProxy from 'eventproxy';
import _ from 'lodash';

class Article extends BaseController {
  constructor() {
    super();
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
    var limit = Number(req.query.limit) || config.list_article_count;
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-created_at' };
    var ep = new EventProxy();

    ep.fail(next);

    ArticleModel.find({}, '', options, ep.done('articles'));

    ep.all('articles', function (articles) {
      articles.forEach(function (article) {
        UserModel.findById(article.user_id, ep.done(function (author) {
          article.author = _.pick(author, ['name', 'avatar']);
          ep.emit('author');
        }));
      });
      ep.after('author', articles.length, function () {
        articles = articles.map(function (article) {
          return _.pick(article, ['id', 'user_id', 'body', 'title', 'created_at',
            'comments_count', 'likes_count', 'view_count', 'author']);
        });
        res.send({ success: true, data: articles });
      });
    });
  }
}

export default new Article()