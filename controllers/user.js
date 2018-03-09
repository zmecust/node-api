'use strict';

import UserModel from '../models/user'
import BaseController from './baseController'
import formidable from 'formidable'
import * as jwt from 'jwt-simple'

class User extends BaseController {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      const { name, password } = fields;
      try {
        if (!name) {
          throw new Error('用户名参数错误');
        } else if (!password) {
          throw new Error('密码参数错误');
        }
      } catch (err) {
        res.send({
          status: 0,
          type: 'ERROR_QUERY',
          message: err.message,
        })
        return
      }
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
            iss: user.id, // issuer 表明请求的实体
            exp: expires, // expires token的生命周期
          }, 'jwtTokenSecret');
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
    })
  }

  async register(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
          type: 'FORM_DATA_ERROR',
          message: '表单信息错误'
        })
        return
      }
      const { name, password } = fields;
      try {
        if (!name) {
          throw new Error('用户名错误')
        } else if (!password) {
          throw new Error('密码错误')
        }
      } catch (err) {
        console.log(err.message, err);
        res.send({
          status: 0,
          type: 'GET_ERROR_PARAM',
          message: err.message,
        })
        return
      }
      try {
        const user = await UserModel.findOne({ name })
        if (user) {
          console.log('该用户已经存在');
          res.send({
            status: 0,
            type: 'USER_HAS_EXIST',
            message: '该用户已经存在',
          })
        } else {
          const user_id = await this.getId('user_id');
          const newpassword = this.encryption(password);
          let newUser = {
            name,
            password: newpassword,
            id: user_id,
          }
          newUser = await UserModel.create(newUser)
          // 产生token过期时间，这里设置
          let expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
          let token = jwt.encode({
            iss: user_id, // issuer 表明请求的实体
            exp: expires, // expires token的生命周期
          }, 'jwtTokenSecret');
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
    })
  }
}

export default new User()