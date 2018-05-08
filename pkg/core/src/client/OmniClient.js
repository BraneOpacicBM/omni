import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';

import Omni from '../app/Omni';
import NotFoundError from '../app/components/NotFoundError';
import configureStore from '../app/utils/configureStore';

export default class OmniClient extends Omni {
	start() {
		this.plugins.forEach(plugin => {
			plugin(this.pluginApi);
		});

		this.addRoute({
			path: '*',
			component: NotFoundError,
		});

		const store = configureStore(this.reducers, this.epics);
		window.store = store;

		hydrate(
			<Provider store={store}>
				<Router routes={this.routes} history={browserHistory} />
			</Provider>,
			document.getElementById('omni-container'),
		);
	}
}
