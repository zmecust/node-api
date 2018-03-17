'use strict';

import express from 'express'
import User from '../controllers/user'
import Article from '../controllers/article'
import CheckLogin from '../middlewares/check_login'
const router = express.Router();

router.post('/login', User.login);
router.post('/register', User.register);
router.get('/articles', Article.index);
router.post('/article', CheckLogin.checkLogin, Article.create);

export default router
