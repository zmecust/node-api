'use strict';

module.exports = {
	port: 8001,
	url: 'mongodb://127.0.0.1:27017/laravue',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 365 * 24 * 60 * 60 * 1000,
		}
	},
	// 话题列表显示的话题数量
	list_article_count: 20,
}