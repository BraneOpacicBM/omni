import React from 'react';

import Login from './components/Login';
import providers from './providers';
import sessionReducer from './reducers/session';

export default function authPlugin(omni) {
	let Layout = Login;

	omni.addRoute({
		path: '/login',
		component: () => React.createElement(Layout, { providers }),
	});

	const addProvider = (name, Component, getSecret) => {
		providers.push({ Component, getSecret, name });
	};

	const setLayout = layout => {
		Layout = layout;
	};

	omni.auth = { addProvider, setLayout };
	omni.reducers.session = sessionReducer;
}
