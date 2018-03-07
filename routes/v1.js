'use strict';

import express from 'express'
import Welcome from '../controller/v1/welcome'
import User from '../controller/v1/user'
const router = express.Router();

router.get('/welcome', Welcome.home);
router.post('/login', User.login);
 
export default router
