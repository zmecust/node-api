import db from '../models';
import BaseController from './baseController';
import _ from 'lodash';

const Article = db.article;

class articleController extends BaseController {
  constructor() {
    super();
    this.index = this.index.bind(this);
  }

  async index(ctx, next) {
    ctx.body = { data: 'haha' };
  }
}

export default new articleController();
