export default function createSelect(pool) {
	return (table, id, idField = 'id') => new Promise((resolve, reject) => {
		pool.getConnection((err, conn) => {
			if (err) {
				return reject(err);
			}

			const query = `SELECT * FROM ${table} WHERE ${idField} = ?`;
			conn.query(query, [id], (err, [row]) => {
				conn.release();
				if (err) {
					return reject(err);
				}

				resolve(row ? { ...row } : undefined);
			});
		});
	});
}
