

CREATE TABLE Servers
(
    id VARCHAR(200) NOT NULL PRIMARY KEY,
    ip_adress VARCHAR(200) NOT NULL,
    server_name VARCHAR(200) NOT NULL,
    type_id INT NOT null references server_types(id),
    is_running Boolean NOT NULL,
    time_running INT not null,
    last_start TIMESTAMP,
    last_end TIMESTAMP
)


