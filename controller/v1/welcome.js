'use strict';

import UserModel from '../../models/user'
import BaseController from '../prototype/baseController'

class Admin extends BaseController {
  constructor(){
		super()
		this.home = this.home.bind(this);
	}

  async home(req, res, next) {
    try {
      const orders = await UserModel.find();
      res.send(orders);
    } catch (err) {
      res.send({
        status: 0,
        type: 'ERROR_GET_ADMIN_LIST',
        message: '获取失败'
      })
    }
  }
}

export default new Admin()