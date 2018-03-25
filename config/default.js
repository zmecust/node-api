'use strict';

import path from 'path'

module.exports = {
  port: 8001,
  url: 'mongodb://115.28.170.217:27017/laravue',
  session: {
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    }
  },
  // debug 为 true 时，用于本地调试
  debug: true,
  // 话题列表显示的话题数量
  list_article_count: 20,
  // log 日志
  log_dir: path.join(__dirname, '../logs'),
  // jwt 配置
  jwt_secret: 'laravue',
  //redis 配置
  redis: {
    port: 6379,
    host: '127.0.0.1',
  }
}