INSERT INTO departments (department_name)
VALUES
	('MARKETING'),
	('ENGINEERING'),
	('SALES'),
	('BUILDING SERVICES');
	
INSERT INTO roles (title, salary, department_id)
VALUES
	('Marketing Manager', 150000, 1),
	('Product Manager', 100000, 1),
	('Social Media Manager', 65000, 1),
	('Engineering Manager', 140000, 2),
	('Lead Engineer', 100000, 2),
	('Engineer', 80000, 2),
	('Sales Manager', 80000, 3),
	('Regional Sales', 60000, 3),
	('Janitor', 20000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
	('Ronald', 'Firbank', 1, 0),
	('Virginia', 'Woolf', 4, 1),
	('Piers', 'Gaveston', 7, 1),
	('Charles', 'LeRoi', 2, 1),
	('Katherine', 'Mansfield', 3, 1),
	('Dora', 'Carrington', 4, 2),
	('Edward', 'Bellamy', 5, 2),
	('Montague', 'Summers', 6, 1),
	('Octavia', 'Butler', 7, 1),
	('Unica', 'Zurn', 8, 7),
	('Joe', 'Porrazzo', 9, 1);