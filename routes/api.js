'use strict';

import express from 'express'
import User from '../controllers/user'
import Article from '../controllers/article'
import CheckLogin from '../middlewares/check_login'
import RegisterValidate from '../validate/register'
import LoginValidate from '../validate/login'
import CreateArticleValidate from '../validate/create_article'

const router = express.Router();

router.post('/login', LoginValidate, User.login);
router.post('/register', RegisterValidate, User.register);
router.get('/articles', Article.index);
router.post('/article', CheckLogin.checkLogin, CreateArticleValidate, Article.create);

export default router
