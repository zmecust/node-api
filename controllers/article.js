'use strict';

import ArticleModel from '../models/article'
import UserModel from '../models/user'
import Category from '../models/category'
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

    try {
      let articles = await ArticleModel.find({}, '', options).populate('category_id', 'name').populate('user_id', 'name', 'avatar');
      articles = articles.map((article) => {
        return _.pick(article, [ '_id', 'user_id', 'category_id', 'body', 'title', 'created_at',
          'comments_count', 'likes_count', 'view_count' ]);
      });
      res.send({ success: true, data: articles });

    } catch (err) {
      res.send({
        status: 0,
        type: 'GET_ARTICLES_FAILED',
        message: '查询失败',
      })
    }
  }

  async create(req, res, next) {
    let { title, body, article_url, category_id } = req.body;
    try {
      //是否需要创建一个标签
      let category = await Category.findOne({ _id: category_id });
      if (category) {
        category.articles_count += 1;
        await category.save();
      } else {
        category = await Category.create({ name: category_id, articles_count: 1 });
        let category_id = category._id;
      }
      //创建新文章
      let newArticle = {
        body,
        title,
        category_id,
        user_id: req.user_id,
        article_url: article_url || '',
      }
      newArticle = await ArticleModel.create(newArticle);
      //该用户文章数加1
      const user = await UserModel.findOne({ _id: req.user_id });
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
  }
}

export default new Article()