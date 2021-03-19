const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  
    firstname:{
        type: String,
        required: true
    },
    middlename:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    setofskills:{
        type: Object,
        required: true
    },             
}, {timestamps: true});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

