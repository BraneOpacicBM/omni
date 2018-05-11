export default function createGetSecret(omni) {
	return userId => new Promise(async (resolve, reject) => {
		try {
			const [row] = await omni.mysql.query('SELECT password FROM auth_password WHERE user_id = ?', [userId]);
			if (!row) return reject(new Error(`Can't find user with id ${userId}`));
			resolve(row.password);
		} catch (err) {
			reject(err);
		}
	});
}
