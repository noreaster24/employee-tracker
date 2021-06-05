const express = require ('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// get all employees and their information
router.get('/employee', (req, res) => {
    const sql = `SELECT employee.*, role.title
    AS title
    FROM employee
    LEFT JOIN role
    ON employee.id = role.id`
});