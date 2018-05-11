import React from 'react';

import Login from './components/Login';
import providers from './providers';
import sessionReducer from './reducers/session';

export default function authPlugin(omni) {
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
