const inquirer = require('inquirer');
const db = require('./db/connection');

// view all departments
const viewDepts = function () {
    db.query(`SELECT * FROM departments`,
        function (err, rows) {
            if (err) {
                console.log(err);
            }
            console.table(rows);
        })
};

// view all employees in database
const viewEmployees = function () {
    db.query(`SELECT * FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id`,
        function (err, rows) {
            if (err) {
                console.log(err);
            }
            console.table(rows);
        });
};

const viewRoles = function () {
    db.query(`SELECT * FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id`,
        function (err, rows) {
            if (err) {
                console.log(err);
            }
            console.table(rows);
        })
};

// add a new department to the database
const addDept = function () {

};

//add a new role to the database
function addRole() {
    let departments = [];
    db.query(`SELECT * FROM departments`,
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                res[i].first_name + " " + res[i].last_name
                departments.push({ name: res[i].name, value: res[i].id });
            }
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "Please type the role you would like to add?"
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "Please provide the salary for this role?"
                    },
                    {
                        type: "list",
                        name: "department",
                        message: "Please provide the department?",
                        choices: departments
                    }
                ])
                .then(function (res) {
                    console.log(res);
                    const query = db.query(
                        `Add to roles SET ?`,
                        {
                            title: res.title,
                            salary: parseInt(res.salary),
                            department_id: res.department
                        },
                        function (err, res) {
                            if (err) throw err;
                        }
                    )
                })
        })
};

// add a new employee to the database
const addEmployee = function () {
    let managers = [];

    db.query(`SELECT first_name FROM employees
    WHERE role_id = 1`, (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(element => { managers.push(element.first_name) });

        inquirer.prompt([
            {
                type: "input",
                name: "first",
                message: "What is the first name of your employee?"
            },
            {
                type: "input",
                name: "last",
                message: "What is the last name of your employee?"
            },
            {
                type: "list",
                name: "role",
                message: "What role does this employee have?",
                choices: ["Marketing Manager", "Product Manager", "Social Media Manager", "Lead Engineer", "Engineer", "Sales Manager", "Regional Sales"]
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: managers
            }]).then(employee => {
                let param = "";

                if (employee.role === "Marketing Manager") {
                    param = 1;
                }
                if (employee.role === "Product Manager") {
                    param = 2;
                }
                if (employee.role === "Social Media Manager") {
                    param = 3;
                }
                if (employee.role === "Lead Engineer") {
                    param = 4;
                }
                if (employee.role === "Engineer") {
                    param = 5;
                }
                if (employee.role === "Sales Manager") {
                    param = 6;
                }
                if (employee.role === "Regional Sales") {
                    param = 7;
                }

                let call = `INSERT INTO employees (first_name, last_name, role_id, manager_id`;

                let params = [employee.first, employee.last, param, employee.manager]

                db.query(call, params, (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    db.query(`SELECT * FROM employees`, (err, res) => {
                        if (err) {
                            console.log(err)
                        }
                        console.table(res);
                    });
                });
            });
    });
};

// Update an employee's role in the database
const updateEmployee = function () {

};

// initiate the program
const initProgram = () => {
    console.log(`
    ========================
    *** EMPLOYEE TRACKER ***
    ========================
    `
    );
    questions();
}

const questions = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "server_action",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"],
        }
    ])
        .then((answers) => {
            if (answers.server_action === "View All Departments") {
                viewDepts();
                questions();
            }
            else if (answers.server_action === "View All Roles") {
                viewRoles();
                questions();
            }
            else if (answers.server_action === "View All Employees") {
                viewEmployees();
                questions();
            }
            else if (answers.server_action === "Add a Department") {
                addDept();
                questions();
            }
            else if (answers.server_action === "Add a Role") {
                addRole();
                questions();
            }
            else if (answers.server_action === "Add an Employee") {
                addEmployee();
                questions();
            }
            else {
                updateEmployee()
                questions();
            };
        });
};

initProgram();

