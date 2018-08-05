'use strict';

const router = require('koa-router')();
const articleController = require('../controllers/articleController');

router.prefix('/api/v1');
router.get('/articles', articleController.index);

module.exports = router;
