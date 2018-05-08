import createSelect from './createSelect';

export default function createInsert(pool) {
	return (table, data, idField) => new Promise((resolve, reject) => {
		pool.getConnection((err, conn) => {
			if (err) {
				return reject(err);
			}

			const query = `INSERT INTO ${table} SET ?`;
			conn.query(query, data, (err, result) => {
				conn.release();
				if (err) {
					return reject(err);
				}

				createSelect(pool)(table, result.insertId, idField)
					.then(resolve)
					.catch(reject);
			});
		});
	});
}
