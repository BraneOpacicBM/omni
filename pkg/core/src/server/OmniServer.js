import express from 'express';

import createHandleRequest from './utils/createHandleRequest';
import createStoreMiddleware from './utils/createStoreMiddleware';
import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

import Omni from '../app/Omni';

export default class OmniServer extends Omni {
	constructor() {
		super();

		this.app = express();
		this.app.disable('x-powered-by');
	}

	async start() {
		await this.initPlugins();

		this.app.use(express.static(`${__dirname}/public`));
		this.app.use(createStoreMiddleware(this.reducers));

		this.app.get('*', createHandleRequest(this.routes));

		this.app.use(notFoundMiddleware);
		this.app.use(handleErrorMiddleware);

		this.app.listen(12831, () => {
			console.info('Omni app listening on port 12831');
		});
	}
}
