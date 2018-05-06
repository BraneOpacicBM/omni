import createQuery from './createQuery';

export default function createCreateTable(pool) {
	return (table, query) => {
		try {
			const result = createQuery(pool)(query);
			if (result.warningCount === 0) {
				console.info(`Created ${table} table`);
			}
		} catch (err) {
			console.error(`Failed to create table ${table}`);
		}
	};
}
