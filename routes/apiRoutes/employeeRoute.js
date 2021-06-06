const express = require ('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// get all employees and their information
router.get('/employees', (req, res) => {
    const sql = `SELECT employees.*, roles.title
    AS title
    FROM employees
    LEFT JOIN roles
    ON employees.id = roles.id`
});


module.exports = router;