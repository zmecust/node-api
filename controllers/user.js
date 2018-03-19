'use strict';

import UserModel from '../models/user'
import BaseController from './baseController'
import * as jwt from 'jwt-simple'

class User extends BaseController {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req, res, next) {
    const { name, password } = req.body;
    const newpassword = this.encryption(password);
    try {
      const user = await UserModel.findOne({ name });
      //创建一个新的用户
      if (!user) {
        res.send({
          status: 0,
          type: 'NOT_FOUND_THIS_USER',
          message: '未找到该用户',
        })
      } else if (user.password.toString() !== newpassword.toString()) {
        res.send({
          status: 0,
          type: 'ERROR_PASSWORD',
          message: '密码错误',
        })
        return
      } else {
        // 产生token过期时间，这里设置
        let expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
        let token = jwt.encode({
          user_id: user._id, // issuer 表明请求的实体
          exp: expires,      // expires token的生命周期
        }, req.jwtTokenSecret);
        res.send({
          user: user,
          token: token,
          expires: expires
        });
      }
    } catch (err) {
      res.send({
        status: 0,
        type: 'SAVE_USER_FAILED',
        message: '登陆失败',
      })
    }
  }

  async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const user = await UserModel.findOne({ name })
      if (user) {
        res.send({
          status: 0,
          type: 'USER_HAS_EXIST',
          message: '该用户已经存在',
        })
      } else {
        //const user_id = await this.getId('user_id');
        const newpassword = this.encryption(password);
        let newUser = {
          name,
          email,
          password: newpassword
        }
        newUser = await UserModel.create(newUser)
        // 产生token过期时间，这里设置
        let expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
        let token = jwt.encode({
          user_id: newUser._id, // issuer 表明请求的实体
          exp: expires,         // expires token的生命周期
        }, req.jwtTokenSecret);
        res.send({
          status: 1,
          message: '注册成功',
          user: newUser,
          token: token,
          expires: expires
        });
      }
    } catch (err) {
      res.send({
        status: 0,
        type: 'REGISTER_ADMIN_FAILED',
        message: '注册失败',
      })
    }
  }
}

export default new User()