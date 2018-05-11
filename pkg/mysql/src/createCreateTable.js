import createQuery from './createQuery';

export default function createCreateTable(pool) {
	return async (table, query) => {
		try {
			const result = await createQuery(pool)(query);
			if (result.warningCount === 0) {
				console.info(`Created ${table} table`);
			}
		} catch (err) {
			console.error(`Failed to create table ${table}`);
		}
	};
}
