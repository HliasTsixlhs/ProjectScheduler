// Here we require the Skill model
const Employee = require('../model/employee');
const { ObjectId } = require('mongodb');

//Get all employees
module.exports.get_all_employees = (req, res) => {
    Employee.find()
    .then(result => {
        res.json(result);
    })
    .catch(err => console.log(err))
}


//Post a new employee
module.exports.post_one_employee = (req, res) => {
    const employee = new Employee(req.body)
    employee.save()
    .then(result => {
        res.json({message:"ok"});
    })
    .catch(err => {
        console.log(err)
        res.json({err: "Bad Request!!"})
    });
}


// //Get Employee by using Route param ID
module.exports.get_one_employeeByID = (req, res) => {
    const id = req.params.id;
    Employee.findById(id)
    .then(resutl => {
        res.json(resutl);
    })
    .catch(err => {
        console.log(err);
        res.json({err: err.message})
    })
}


//Delete a Employee based on Route param ID
module.exports.delete_one_employeeByID = (req, res) => {
    const id = req.params.id;
    Employee.findByIdAndDelete(id)
    .then(result => {
        res.json({message:"ok"});
    })
    .catch(err => {
        console.log(err);
    })
}


//Delete multiple Employees
module.exports.delete_many_employees = async (req, res) => {
    // Employee.deleteMany(req.body.map(employee => new Employee(employee)))
    // console.log(req.body)
    
    // Employee.deleteOne( {"_id":new ObjectId("4d512b45cc9374271b02ec4f")});
    // Employee.remove(req.body) 
    console.log("-----------------------------------------",req.body)  
    await req.body.forEach( el => {
         const _id = new ObjectId(el._id)
        //   Employee.deleteOne({_id: new ObjectId(el._id)})
        Employee.deleteOne({_id: _id})
        .then(result => console.log("edw",result))
        .catch(err => {
            console.log(err)
            res.json({err: err.message})
        })
    })

    res.json({message:"ok"});
    



    // } )
    // .then(result => {
    //     res.json(result);
    // })
    // .catch(err => {
    //     console.log(err)
    //     res.json({err: err.message})
    // });
}


//Update an Employee based on Route param ID
module.exports.update_one_employeeByID = (req, res) => {
    const id = req.params.id;
    Employee.findByIdAndUpdate(id, req.body)
    .then(result => {
        res.json({message:"ok"});
    })
    .catch(err => {
        console.log(err);
        res.json({err: err.message})
    })
}