'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const likeSchema = new Schema({
  user_id: { type: ObjectId, ref: 'User' },
  article_id: { type: ObjectId, ref: 'Article' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

likeSchema.index({ user_id: 1 });
likeSchema.index({ article_id: 1 });

const Like = mongoose.model('Like', likeSchema);

export default Like
