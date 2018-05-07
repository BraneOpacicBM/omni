const schema = (
	`create table if not exists auth_password (
		user_id int(11) not null auto_increment,
		password varchar(255) not null,
		primary key (user_id)
	) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;`
);

export default async function authPasswordPlugin(omni) {
	if (!omni.mysql) {
		console.error('Omni password auth plugin is dependent on the mysql plugin.');
		return;
	}

	await omni.mysql.createTable('auth_password', schema);
}
