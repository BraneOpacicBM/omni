import inputsPlugin from '@ocm/inputs';
import mysqlPlugin from '@ocm/mysql';

import inputTypes from './inputs';
import sessionReducer from './reducers/session';
import routes from './routes';

export default class Omni {
	plugins = [
		mysqlPlugin,
		inputsPlugin,
	];

	constructor() {
		this.reducers = { session: sessionReducer };
		this.routes = [...routes];

		this.pluginApi = {
			inputTypes,
			addRoute: this.addRoute,
			reducers: this.reducers,
		};
	}

	addRoute = route => {
		this.routes[0].childRoutes.push(route);
	}

	use(plugin) {
		if (typeof plugin !== 'function') {
			throw new Error('Omni plugins need to be functions');
		}

		this.plugins.push(plugin);
	}
}
