const express = require("express");
const router = express.Router();
const {
  createEmployee,
  readEmployees,
  calAvgSalary,
  filterByExperience,
  topNearners,
  calRetentionRate,
  filterEmployeesBySalaryRange,
} = require("../controller/employeeController");

//----------------EndPoint for create emmployee----------------------
router.post("/create", createEmployee);

//----------------EndPoint for read All emmployee----------------------
router.get("/read", readEmployees);

//----------------EndPoint for average salaries----------------------
router.get("/readavgsalary", calAvgSalary);

//----------------EndPoint for Filter By Experience Level----------------------
router.get("/filterbyexperience", filterByExperience);

//----------------EndPoint for top N earners----------------------
router.get("/topnearners", topNearners);

//----------------EndPoint for calculate retention rate----------------------
router.get("/retentionrate", calRetentionRate);

//----------------EndPoint for filter employee in given salary range----------------------
router.get("/filterbysalary", filterEmployeesBySalaryRange);

module.exports = router;
