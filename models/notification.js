'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

/*
 * type:
 * comment-you: xx 回复了你的 xx 回复
 * follow-you: xx 关注了你
 * new-comment: xx 评论了 xx 帖子
 * like-articles: xx 赞了你的 xx 帖子
 */
const notificationSchema = new Schema({
  type: { type: String },
  from_uid: { type: ObjectId, ref: 'User' },
  to_uid: { type: ObjectId, ref: 'User' },
  article_id: { type: ObjectId, ref: 'Article' },
  comment_id: { type: ObjectId, ref: 'Comment' },
  is_readed: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

notificationSchema.index({ created_at: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification
