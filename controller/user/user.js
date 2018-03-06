'use strict';

import UserModel from '../../models/user'
import formidable from 'formidable'

class Admin {
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
        const admin = await AdminModel.findOne({ name })
        if (admin) {
          console.log('该用户已经存在');
          res.send({
            status: 0,
            type: 'USER_HAS_EXIST',
            message: '该用户已经存在',
          })
        } else {
          const admin_id = await this.getId('admin_id');
          const newpassword = this.encryption(password);
          const newAdmin = {
            name,
            password: newpassword,
            id: admin_id,
            create_time: dtime().format('YYYY-MM-DD'),
            admin: adminTip,
            status,
          }
          await AdminModel.create(newAdmin)
          req.session.admin_id = admin_id;
          res.send({
            status: 1,
            message: '注册成功',
          })
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

export default new Admin()