import express from 'express';

import createHandleRequest from './utils/createHandleRequest';
import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

import Omni from '../app/Omni';

export default class OmniServer extends Omni {
	constructor() {
		super();

		this.app = express();
		this.app.disable('x-powered-by');
	}

	start() {
		this.plugins.forEach(plugin => {
			plugin(this.pluginApi);
		});

		this.app.use(express.static(`${__dirname}/public`));

		this.app.get('*', createHandleRequest(this.routes));

		this.app.use(notFoundMiddleware);
		this.app.use(handleErrorMiddleware);

		this.app.listen(12831, () => {
			console.info('Omni app listening on port 12831');
		});
	}
}
