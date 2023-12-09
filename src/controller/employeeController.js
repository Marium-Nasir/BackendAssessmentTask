const { parse } = require("dotenv");
const employee = require("../model/employee");
const Employee = require("../model/employee");
const calculateExperienceLevel = require("../helperFunctions/calExperienceLevel");

//----------------creating Employee---------------
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

//-------------------Top N Earners---------------------------
const topNearners = async (req, res) => {
  try {
    const N = parseInt(req.query.n);
    if (isNaN(N) || N <= 0) {
      return res.status(404).json({ message: "Invalid value of N" });
    } else {
      const empData = await Employee.find({});
      if (!empData) return res.status(404).json({ message: "Data not found" });
      else {
        const sortEmpByTopSalaries = empData.sort(
          (a, b) => b.salary - a.salary
        );
        const NtopEarners = sortEmpByTopSalaries.slice(0, N);
        return res.status(200).json({ Top_N_Eearners: NtopEarners });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ ErrorMessage: err.message });
  }
};

//-------------------Calculate The Retention Rate----------------
const calRetentionRate = async (req, res) => {
  try {
    const pos = req.query.pos;
    const { currentEmployeesInDept } = req.body;
    const val = parseInt(currentEmployeesInDept.toString());
    if (isNaN(val) || !pos)
      return res.status(404).json({ message: "Invalid Values" });
    else {
      const empDataByPosition = await Employee.find({ position: pos });
      if (empDataByPosition.length === 0)
        return res.status(404).json({ message: "Data not exists" });
      const totalEmployeesInDepartment = empDataByPosition.length;
      const retentionRate = (val / totalEmployeesInDepartment) * 100;
      return res.status(200).json({ Retention_Rate: retentionRate });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ ErrorMessage: err.message });
  }
};

//----------------------Filter Employees by Salary Range----------------
const filterEmployeesBySalaryRange = async (req, res) => {
  try {
    const min = parseInt(req.query.min);
    const max = parseInt(req.query.max);

    if(min>max) return res.json({message:"min value should be less than max"})

    if (isNaN(min) || isNaN(max) || min <= 0 || max <= 0) {
      return res.status(400).json({ message: "min and max values are not valid numbers" });
    }

    const empData = await Employee.find({
      $expr: {
        $and: [
          { $gte: [{ $toInt: "$salary" }, min] },
          { $lte: [{ $toInt: "$salary" }, max] },
        ],
      },
    });

    if (!empData || empData.length === 0) {
      return res.status(404).json({ message: "No data found in the given salary range" });
    } else {
      return res.status(200).json({ empData });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ ErrorMessage: err.message });
  }
};


module.exports = {
  createEmployee,
  readEmployees,
  calAvgSalary,
  filterByExperience,
  topNearners,
  calRetentionRate,
  filterEmployeesBySalaryRange,
};
