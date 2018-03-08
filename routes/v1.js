'use strict';

import express from 'express'
import Welcome from '../controller/v1/welcome'
import User from '../controller/user'
const router = express.Router();

router.get('/welcome', Welcome.home);
router.post('/login', User.login);
router.post('/register', User.register);
 
export default router
