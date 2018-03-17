'use strict';

import api from './api'

export default app => {
	app.use('/api/v1', api);
}