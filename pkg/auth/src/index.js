import jwt from 'jsonwebtoken';
import React from 'react';

import Login from './components/Login';
import sessionReducer from './reducers/session';

const salt = process.env.AUTH_TOKEN_SALT;

export default function authPlugin(omni) {
	const providers = [];

	omni.addRoute({
		path: '/login',
		component: () => <Login providers={providers} />,
	});

	const addProvider = (name, Component, getSecret) => {
		providers.push({ Component, getSecret, name });
	};

	const createToken = (type, subject, secret) => (
		new Promise((resolve, reject) => {
			jwt.sign({ type }, salt + secret, { subject: `${subject}` }, (err, token) => {
				if (err) return reject(err);
				resolve(token);
			});
		})
	);

	omni.auth = { addProvider, createToken };
	omni.reducers.session = sessionReducer;
}
