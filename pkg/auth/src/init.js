import React from 'react';

import Login from './components/Login';
import sessionReducer from './reducers/session';

export default function authPlugin(omni) {
	const providers = [];

	omni.addRoute({
		path: '/login',
		component: () => <Login providers={providers} />,
	});

	const addProvider = (name, Component, getSecret) => {
		providers.push({ Component, getSecret, name });
	};

	omni.auth = { addProvider };
	omni.reducers.session = sessionReducer;
}
