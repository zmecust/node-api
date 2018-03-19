'use strict'

import formidable from 'formidable';

export default (req, res, next) => {
  const { name, password } = req.body;
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
  next();
};
