'use strict';

import ArticleModel from '../models/article'
import BaseController from './prototype/baseController'
import formidable from 'formidable'
import * as jwt from 'jwt-simple'

class Article extends BaseController {
  constructor() {
    super();
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    var page     = parseInt(req.query.page, 10) || 1;
    page         = page > 0 ? page : 1;
    var limit    = Number(req.query.limit) || config.list_topic_count;
    var mdrender = req.query.mdrender === 'false' ? false : true;
  
    var options = { skip: (page - 1) * limit, limit: limit, sort: '-top -last_reply_at'};
  
    var ep = new eventproxy();
    ep.fail(next);
  
    TopicModel.find({}, '', options, ep.done('topics'));
  
    ep.all('topics', function (topics) {
      topics.forEach(function (topic) {
        UserModel.findById(topic.author_id, ep.done(function (author) {
          if (mdrender) {
            topic.content = renderHelper.markdown(at.linkUsers(topic.content));
          }
          topic.author = _.pick(author, ['loginname', 'avatar_url']);
          ep.emit('author');
        }));
      });
  
      ep.after('author', topics.length, function () {
        topics = topics.map(function (topic) {
          return _.pick(topic, ['id', 'author_id', 'tab', 'content', 'title', 'last_reply_at',
            'good', 'top', 'reply_count', 'visit_count', 'create_at', 'author']);
        });
  
        res.send({success: true, data: topics});
      });
    });
  };  
}

export default new Article()