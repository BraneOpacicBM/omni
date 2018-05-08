import bcrypt from 'bcryptjs';

export default function createHandlePostLogin(omni) {
	return async (req, res) => {
		const { email, password } = req.body;

		/* eslint-disable indent */
		const query = (
`select
	user.id,
	auth_password.password
from
	user
inner join
	auth_password on id = user_id
where email = ?`
		);
		/* eslint-enable indent */

		const [user] = await omni.mysql.query(query, [email]);
		if (!user) {
			return res.status(401).json({
				error: {
					title: 'Invalid login details',
					message: 'Sorry, could not find a user with that email/password combination.',
				},
			});
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return res.status(401).json({
				error: {
					title: 'Invalid login details',
					message: 'Sorry, could not find a user with that email/password combination.',
				},
			});
		}

		try {
			const token = await omni.auth.createToken('password', user.id, user.password);
			res.json({ token });
		} catch (err) {
			res.status(500).json({
				error: {
					title: 'Failed to login',
					message: 'Sorry, could not log you in at this time.',
				},
			});
		}
	};
}
