'use strict';

import UserModel from '../models/user'
import * as jwt from 'jwt-simple'

class CheckLogin {
	constructor() {
		//
	}
	async checkLogin(req, res, next) {
    // 获取token,这里默认是放在headers的authorization
    let token = req.headers.authorization;
    if (token) {
      var decoded = jwt.decode(token, req.jwtTokenSecret);
      if (decoded.exp <= Date.now()) {
        res.send({
          status: 0,
          type: 'TOKEN_OUT_OF_DATE',
          message: '您的登录信息已失效，请重新登录',
        })
        return
      } else {
        req.user_id = decoded.user_id;
        return next()
      }
    } else {
      res.send({
				status: 0,
				type: 'PLEASE_LOGIN_FIRST',
				message: '您还没有登录',
			})
			return
    }
		next()
	}
}

export default new CheckLogin()