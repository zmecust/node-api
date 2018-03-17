'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const commentSchema = new Schema({
  user_id: { type: ObjectId, ref: 'User' },
  body: String,
  parent_id: { type: ObjectId, ref: 'Comment' },
  level: { type: Number, default: 1 }, //评论的层级
  is_hidden: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

commentSchema.index({ created_at: -1 });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment
