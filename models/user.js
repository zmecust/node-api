'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  password: String,
  real_name: String,
  city: String,
  confirm_code: String,
  articles_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  likes_count: { type: Number, default: 0 },
  followers_count: { type: Number, default: 0 },
  followings_count: { type: Number, default: 0 },
  is_banned: { type: Number, default: 0 },    //0:未禁用、 1:已禁用
  is_confirmed: { type: Number, default: 0 }, //0:未激活、 1:已激活
  last_actived_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

userSchema.index({ name: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ created_at: -1 });

const User = mongoose.model('User', userSchema);

export default User
