'use strict'

export default (req, res, next) => {
  const { title, body, category_id } = req.body;
  try {
    if (!category_id) {
      throw new Error('文章类别错误');
    } else if (!title) {
      throw new Error('文章标题错误');
    } else if (!body) {
      throw new Error('文章内容错误');
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
