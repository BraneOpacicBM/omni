import express from 'express';

import createHandleRequest from './utils/createHandleRequest';
import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

import routes from '../app/routes';

export default class OmniServer {
	pluginApi = {};
	plugins = [];

	constructor() {
		this.routes = [...routes];
		this.pluginApi.addRoute = this.addRoute;

		this.app = express();
		this.app.disable('x-powered-by');
	}

	addRoute = route => {
		this.routes[0].childRoutes.push(route);
	}

	start() {
		this.plugins.forEach(plugin => {
			plugin(this.pluginApi);
		});

		this.app.get('*', createHandleRequest(this.routes));

		this.app.use(notFoundMiddleware);
		this.app.use(handleErrorMiddleware);

		this.app.listen(12831, () => {
			console.info('Omni app listening on port 12831');
		});
	}

	use(plugin) {
		if (typeof plugin !== 'function') {
			throw new Error('Omni plugins need to be functions');
		}

		this.plugins.push(plugin);
	}
}
