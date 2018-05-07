import React from 'react';

import Login from './components/Login';

export default function authPlugin(omni) {
	const providers = [];

	omni.addRoute({
		path: '/login',
		component: () => <Login providers={providers} />,
	});

	const addProvider = (name, Component) => {
		providers.push({ Component, name });
	};

	omni.auth = { addProvider };
}
