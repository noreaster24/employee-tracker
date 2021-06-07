DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE departments (
	id INT AUTO_INCREMENT PRIMARY KEY,
	department_name VARCHAR(30)
);

CREATE TABLE roles (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT,
	manager_id INT,
	FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);



