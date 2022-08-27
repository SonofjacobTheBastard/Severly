create table server_types
(
	id INT GENERATED ALWAYS AS identity primary key,
	type_name varchar
(200) not null,
	rate float not null
)