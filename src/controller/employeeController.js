const { parse } = require("dotenv");
const employee = require("../model/employee");
const Employee = require("../model/employee");
const calculateExperienceLevel = require("../helperFunctions/calExperienceLevel");
//----------------creating---------------
const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const empData = await employee.save();
    console.log(empData);
    res.status(201).json({ message: "Employee Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ErrorMsg: err.message });
  }
};

//------------------Read/Load all the employees-------------------
const readEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ joiningDate: -1 });
    res.status(200).json(employees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ ErrorMesssage: err.message });
  }
};

//---------------calculate average employees salary by position---------------
const calAvgSalary = async (req, res) => {
  try {
    const pos = req.query.pos;
    const filterPosition = await Employee.find({ position: pos });
    if (filterPosition.length == 0) {
      return res.status(404).json({ ErrorMessage: "Position is not exists" });
    } else {
      let TotalSalaries = 0;
      const count = filterPosition.length;
      filterPosition.forEach((employee) => {
        let empSalaries = parseInt(employee.salary);
        TotalSalaries += empSalaries;
        return TotalSalaries;
      });
      const AverageSalary = TotalSalaries / count;
      return res.status(200).json({
        message: `Average salary of the position ${pos} is ${AverageSalary}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ ErrorMesssage: err.message });
  }
};

//-------------------filter by experience level-------------------
const filterByExperience = async (req, res) => {
  try {
    const minVal = req.query.minVal;
    const maxVal = req.query.maxVal;
    const data = await Employee.find({});
    if (data.length === 0) {
      return res.status(404).json({ Message: "Data not exists" });
    } else {
      const filteredEmp = data.filter((elem) => {
        const experienceLevel = calculateExperienceLevel(elem.joiningDate);
        return experienceLevel >= minVal && experienceLevel <= maxVal;
      });
      if (filteredEmp.length === 0) {
        return res.status(404).json({ Message: "Data not exists" });
      }
      res.status(200).json(filteredEmp);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ ErrorMesssage: err.message });
  }
};

module.exports = {
  createEmployee,
  readEmployees,
  calAvgSalary,
  filterByExperience,
};
