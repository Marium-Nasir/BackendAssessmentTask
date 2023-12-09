const express = require('express')
const router = express.Router()
const {createEmployee,readEmployees,calAvgSalary,filterByExperience} = require('../controller/employeeController')

//----------------EndPoint for create emmployee----------------------
router.post('/create',createEmployee);

//----------------EndPoint for create emmployee----------------------
router.get('/read',readEmployees);

//----------------EndPoint for create emmployee----------------------
router.get('/readavgsalary',calAvgSalary);

//----------------Filer By Experience Level----------------------
router.get('/filterbyexperience',filterByExperience);
module.exports = router