const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeeController');


//Get all employees
router.get('/', employeeController.get_all_employees)

// //Post a new employee
router.post('/', employeeController.post_one_employee)

// //Get Employee by using Route param ID
router.get('/:id', employeeController.get_one_employeeByID)

//Delete multiple Employees 
router.delete('/manydelete', employeeController.delete_many_employees)

//Delete a Employee based on Route param ID
router.delete('/:id', employeeController.delete_one_employeeByID)


//Update a Employee based on Route param ID
router.put('/:id/update', employeeController.update_one_employeeByID)


module.exports = router;