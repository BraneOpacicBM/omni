import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import createHandleRequest from './utils/createHandleRequest';
import createStoreMiddleware from './utils/createStoreMiddleware';
import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

import Omni from '../app/Omni';

export default class OmniServer extends Omni {
	constructor() {
		super();

		this.api = express();
		this.api.disable('x-powered-by');
		this.api.use(cors());
		this.api.use(bodyParser.urlencoded({ extended: true }));
		this.pluginApi.api = this.api;

		this.app = express();
		this.app.disable('x-powered-by');
	}

	async start() {
		await this.initPlugins();

		this.app.use(express.static(`${__dirname}/public`));
		this.app.use(cookieParser());
		this.app.use(createStoreMiddleware(this.reducers, this.epics));

		this.app.get('*', createHandleRequest(this.routes));

		this.app.use(notFoundMiddleware);
		this.app.use(handleErrorMiddleware);

		this.api.listen(12830, () => {
			console.info('Omni api listening on port 12830');
		});

		this.app.listen(12831, () => {
			console.info('Omni app listening on port 12831');
		});
	}
}
