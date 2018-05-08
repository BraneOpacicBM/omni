import bcrypt from 'bcryptjs';

import init from './init';
import createHandlePostLogin from './utils/createHandlePostLogin';

const schema = (
	`create table if not exists auth_password (
		user_id int(11) not null auto_increment,
		password varchar(255) not null,
		primary key (user_id)
	) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;`
);

const email = process.env.AUTH_PASSWORD_SUPERADMIN_EMAIL;
const password = process.env.AUTH_PASSWORD_SUPERADMIN_PASSWORD;

export default async function authPasswordPlugin(omni, next) {
	if (!omni.mysql) {
		console.error('Omni password auth plugin is dependent on the mysql plugin.');
		return;
	}

	await omni.mysql.createTable('auth_password', schema);

	if (email && password) {
		let [user] = await omni.mysql.query('select * from user where email = ?', [email]);
		if (!user) {
			try {
				const hash = await bcrypt.hash(password, 10);

				user = await omni.mysql.insert('user', {
					email,
					first_name: 'John',
					last_name: 'Doe',
					superadmin: true,
				});

				await omni.mysql.insert('auth_password', {
					user_id: user.id,
					password: hash,
				}, user.id);
			} catch (err) {
				console.error('Failed to create superadmin user', err);
			}

			console.info('Created superadmin user %s', email);
		}
	}

	omni.api.post('/auth/password', createHandlePostLogin(omni));

	init(omni);
	next();
}
