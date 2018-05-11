import jwt from 'jsonwebtoken';

import { setToken, setUser } from '../actions/session';
import providers from '../providers';

const salt = process.env.AUTH_TOKEN_SALT;

function verifyToken(token, secret) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, salt + secret, err => {
			if (err) reject(err);
			resolve();
		});
	});
}

export default function createEnsureAuthMiddleware(omni) {
	return async function ensureAuthMiddleware(req, res, next) {
		const token = req.cookies.omni_token;
		if (!token && !/^\/(?:auth|login)/.test(req.path)) {
			return res.redirect('/login');
		}

		if (!token) {
			return next();
		}

		const payload = jwt.decode(token);
		const provider = providers.find(p => p.name === payload.type);

		if (!provider) {
			res.clearCookie('omni_token');
			return res.redirect('/login');
		}

		try {
			const secret = await provider.getSecret(payload.sub);
			await verifyToken(token, secret);
			const user = await omni.mysql.select('user', payload.sub);
			req.store.dispatch(setToken({ token }));
			req.store.dispatch(setUser({ user }));
		} catch (err) {
			console.error(err);
			res.clearCookie('omni_token');
			return res.redirect('/login');
		}

		next();
	};
}
