const schema = (
	`create table if not exists user (
		id int(11) not null auto_increment,
		first_name varchar(50) not null,
		last_name varchar(50) not null,
		email varchar(255) not null,
		image text null,
		superadmin boolean not null default false,
		created_at datetime not null default now(),
		primary key (id)
	) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;`
);

export default async function userPlugin(omni) {
	if (!omni.mysql) {
		console.error('Omni user plugin is dependent on the mysql plugin.');
		return;
	}

	await omni.mysql.createTable('user', schema);
}
