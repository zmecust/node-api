'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const articleSchema = new Schema({
  user_id: { type: ObjectId, ref: 'User' },
  category_id: { type: ObjectId, ref: 'Category' },
  title: String,
  body: String,
  article_url: String,
  comments_count: { type: Number, default: 0 },
  likes_count: { type: Number, default: 0 },
  view_count: { type: Number, default: 0 },
  close_comment: { type: Number, default: 0 }, //0:关闭评论
  is_hidden: { type: Number, default: 0 },     //0:隐藏
  is_excellent: { type: Number, default: 0 },  //0:精华
  last_comment_user_id: { type: ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  last_comment_time: { type: Date, default: Date.now }
})

articleSchema.index({ user_id: 1, created_at: -1 });
articleSchema.index({ category_id: 1 });
articleSchema.index({ created_at: -1 });

const Article = mongoose.model('Article', articleSchema);

export default Article
