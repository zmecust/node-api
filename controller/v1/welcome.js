'use strict';

import UserModel from '../../models/user'
// import AddressComponent from '../../prototype/addressComponent'
// import crypto from 'crypto'
// import formidable from 'formidable'
// import dtime from 'time-formater'

class Admin {
	home(req, res, next) {
    console.log('OK');
    const orders = UserModel.findOne();
    console.log(orders);
    res.send(orders);
	}
}

export default new Admin()