import jwt from 'jsonwebtoken';

import init from './init';

const salt = process.env.AUTH_TOKEN_SALT;

export default function authPlugin(omni) {
	init(omni);

	const createToken = (type, subject, secret) => (
		new Promise((resolve, reject) => {
			jwt.sign({ type }, salt + secret, { subject: `${subject}` }, (err, token) => {
				if (err) return reject(err);
				resolve(token);
			});
		})
	);

	omni.auth.createToken = createToken;
}
