'use strict'

import formidable from 'formidable';

export default (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name) {
      throw new Error('用户名错误')
    } else if (!password) {
      throw new Error('密码错误')
    } else if (!email) {
      throw new Error('邮箱错误')
    }
  } catch (err) {
    res.send({
      status: 0,
      type: 'GET_ERROR_PARAM',
      message: err.message,
    })
    return
  }
  next();
};
