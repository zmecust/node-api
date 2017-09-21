'use strict';

import express from 'express'
import Welcome from '../controller/v1/welcome'
const router = express.Router();

router.get('/welcome', Welcome.home);
 
export default router
