'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const followSchema = new Schema({
  follower_id: { type: ObjectId, ref: 'User' }, // 关注者
  followed_id: { type: ObjectId, ref: 'User' }, // 被关注者
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

followSchema.index({ follower_id: 1 });
followSchema.index({ followed_id: 1 });

const Follow = mongoose.model('Follow', followSchema);

export default Follow
