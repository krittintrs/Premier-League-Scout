CREATE USER 'epldefault'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
GRANT SELECT, INSERT ON eplScout.user TO 'epldefault'@'localhost';

CREATE USER 'epluser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'usersocool';
GRANT SELECT ON eplScout.* TO 'epluser'@'localhost';

CREATE USER 'epladmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'adminez';
GRANT ALL PRIVILEGES ON eplScout.* TO 'epladmin'@'localhost';
