const express = require('express');
const server = express();
const mongoose = require('mongoose');

const morgan = require('morgan');
const fs = require('fs');

const bodyParser = require('body-parser');

// need to enable cors to run in locally (ofc we can mask it manually)
const cors = require('cors')
server.use(cors())

//import SkillsRoutes
const skillsRoutes = require('./routes/skillsRoutes')

//import EmployeesRoutes
const employeesRoutes = require('./routes/employeesRoutes')


// Here we connect our server to MongoDB and after connection is accomplished, then we listen for requests
const dbURI = "mongodb+srv://indeavorUser:indeavorUser1234@nodetuts.co6ky.mongodb.net/scheduler-database?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => server.listen(8000))
.catch(err => console.log(err));


// Keep history logs
server.use(morgan('common', {
    stream: fs.createWriteStream('./middleware/historyLogs', {flags: 'a'})
}));
// Console out logs
server.use(morgan('dev'));

// Just use this middleware to encode data to create the req.body
server.use(express.urlencoded({extended: true}));
server.use(bodyParser.json());

// skills routes
server.use('/skills', skillsRoutes)


// My Custom Logger 
// const logger = require('./middleware/logger')
// server.use(logger.SaveEmployeesHistory     
// );

// Employees routes
server.use('/employees', employeesRoutes)








