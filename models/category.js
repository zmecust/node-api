'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const categorySchema = new Schema({
  name: String,
  parent_id: { type: ObjectId, ref: 'Category' },
  articles_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

categorySchema.index({ name: 1 }, { unique: true });
categorySchema.index({ created_at: -1 });

const Category = mongoose.model('Category', categorySchema);

export default Category
