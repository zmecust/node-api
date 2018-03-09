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
    this.create = this.create.bind(this);
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
      articles.forEach(function (article
      ) {
        UserModel.findOne({ id: article.user_id }, ep.done(function (author) {
          article.author = _.pick(author, ['name', 'last_actived_at']);
          ep.emit('author');
        }));
      });
    
      ep.after('author', articles.length, function () {
        
        articles = articles.map(function (article) {
          return _.pick(article, ['id', 'user_id', 'body', 'title', 'created_at',
            'comments_count', 'likes_count', 'view_count', 'author', 'category']);
        });
    
        res.send({success: true, data: articles});
      });
    })
  }

  async create(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      const { category, title, body } = fields;
      try {
        if (!category) {
          throw new Error('文章类别错误');
        } else if (!title) {
          throw new Error('文章标题错误');
        } else if (!body) {
          throw new Error('文章内容错误');
        }
      } catch (err) {
        res.send({
          status: 0,
          type: 'ERROR_QUERY',
          message: err.message,
        })
        return
      }
      try {
        //创建一个新的文章
        const article_id = await this.getId('article_id');
        let newArticle = {
          title,
          body,
          category,
          id: article_id,
          user_id: req.user_id
        }
        newArticle = await ArticleModel.create(newArticle);

        const user = await UserModel.findOne({ id: req.user_id });
        user.articles_count += 1;
        await user.save();

        res.send({
          success: true,
          article: newArticle
        });
      } catch (err) {
        res.send({
          status: 0,
          type: 'SAVE_USER_FAILED',
          message: '创建失败',
        })
      }
    })
  }
}

export default new Article()