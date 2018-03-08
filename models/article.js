'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  id: Number,
  user_id: { type: ObjectId },
  category_id: { type: ObjectId },
  title: String,
  body: String,
  article_url: String,
  articles_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  likes_count: { type: Number, default: 0 },
  view_count: { type: Number, default: 0 },
  close_comment: { type: Number, default: 0 }, //0:关闭评论
  is_hidden: { type: Number, default: 0 },     //0:隐藏
  is_excellent: { type: Number, default: 0 },  //0:精华
  last_comment_user_id: { type: ObjectId },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

articleSchema.index({ id: 1 });
TopicSchema.index({ create_at: -1 });

const Article = mongoose.model('Article', articleSchema);

export default Article
