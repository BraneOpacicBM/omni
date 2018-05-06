import mysql from 'mysql';

import createCreateTable from './createCreateTable';
import createQuery from './createQuery';

export default function mysqlPlugin(omni) {
	const pool = mysql.createPool({
		host: process.env.MYSQL_DB_HOST,
		user: process.env.MYSQL_DB_USER,
		password: process.env.MYSQL_DB_PASS,
		database: process.env.MYSQL_DB_NAME,
	});

	omni.mysql = {
		createTable: createCreateTable(pool),
		query: createQuery(pool),
	};
}
