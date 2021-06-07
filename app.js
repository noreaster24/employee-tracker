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
            }
            else if (answers.server_action === "View All Roles") {
                viewRoles();
            }
            else if (answers.server_action === "View All Employees") {
                viewEmployees();
            }
            else if (answers.server_action === "Add a Department") {
                addDept();
            }
            else if (answers.server_action === "Add a Role") {
                addRole();
            }
            else if (answers.server_action === "Add an Employee") {
                addEmployee();
            }
            else {
                updateEmployee()
            };
        });
};

initProgram();

