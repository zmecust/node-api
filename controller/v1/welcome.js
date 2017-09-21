'use strict';

// import AdminModel from '../../models/admin/admin'
// import AddressComponent from '../../prototype/addressComponent'
// import crypto from 'crypto'
// import formidable from 'formidable'
// import dtime from 'time-formater'

class Admin {
	home(req, res, next) {
		res.send({
			status: 1,
			success: 'hello world'
		})
	}
}

export default new Admin()