# Software Engineer - Code Challenge - Scheduler!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).




/-------------------------------Dependencies-----------------------------------/

Dependencies for both server and react's app are inside "Scheduler/package.json"'. 
So, use 'npm install' in 'Scheduler-main' folder to install them. 
(Need to install 'node_modules' folder).

  "dependencies": {
    "@material-ui/core": "^4.11.3",
    "@material-ui/icons": "^4.11.2",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "cors": "^2.8.5",
    "exceljs": "^4.2.0",
    "express": "^4.17.1",
    "framer-motion": "^3.10.5",
    "materialize-css": "^1.0.0-rc.2",
    "mongoose": "^5.11.17",
    "morgan": "^1.10.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.2",
    "web-vitals": "^1.0.1"
  }

//-------------------------------------------------------------------------------//





/---------------------------------Back-End----------------------------------------/

Back-End's creation with:
MongoDB + Mongoose and Nodejs + Express 
(MongoDB Cloud Site: https://cloud.mongodb.com/ )

Server's endpoints:

------------Skill's Router:----------------------

Get all skills
Method Get : url: http://localhost:8000/skills


Get Skills into .xlsx file and send them back
Method GET : url: http://localhost:8000/skills/excel


Post a new skill
Method POST : url: http://localhost:8000/skills


Post multiple skills
POST : url: http://localhost:8000/skills/many


Get Skill by using Route param ID
Method GET : url: http://localhost:8000/skills/:id


Delete a Skill based on Route param ID
Method DELETE : url: http://localhost:8000/skills/:id


Update a Skill based on Route param ID
Method UPDATE : url: http://localhost:8000/skills/:id/update


------------Employee's Router:----------------------

Get all employees
Method Get : url: http://localhost:8000/employees


Post a new employee
Method POST : url: http://localhost:8000/employees


Delete multiple employees
Method DELETE : url: http://localhost:8000/employees/manydelete


Get employee by using Route param ID
Method GET : url: http://localhost:8000/employees/:id


Delete a employee based on Route param ID
Method DELETE : url: http://localhost:8000/employees/:id


Update a employee based on Route param ID
Method UPDATE : url: http://localhost:8000/employees/:id/update

//----------------------------------------------------------------------------------//




/--------------------------------Front-End-------------------------------------------/

Front-End's creation with:
ReactJS + Material UI + Framer-Motion for React

Most of skill's Components are sfc components (+ hooks, Modern React xD). On the contrary, the branches that were created for the implementation of the employees, were made without hooks (old
School state).


//-----------------------------------------------------------------------------------//





/------------------------------How to run?--------------------------------------------/

Server: 
Open terminal in 'server' folder and use: $nodemon server

Front-end:
Open terminal in 'Scheduler' folder and use: $npm run start

//------------------------------------------------------------------------------------//





/-------------------------------Thoughts-----------------------------------------------/

Αρχικά, θα ήθελα να σας ευχαριστήσω για την ευκαιρία που μου δόθηκε, σε σχέση με την συμμετοχή
μου στην εν λόγω πρόκληση διότι, όχι μόνο έμαθα από αυτήν, αλλά μου πρόσφερε μια ευχάριστη και 
δημιουργική εβδομάδα! Ακόμη, η διαδικασία διεκπεραίωσης αυτής της εργασίας, μου έδωσε την ευκαιρία 
να συνδυάσω και να κατανοήσω περαιτέρω ορισμένες έννοιες που συνδέονται με το development. Τέλος, με
καθοδήγησε στο να καταλάβω ποια πρέπει να είναι τα επόμενα κομμάτια με τα οποίο πρέπει να ασχοληθώ, 
για να εξελίξω το σύνολο των δυνατοτήτων μου ως προγραμματιστής.

Αναμένω για τις δικές σας συμβουλές και υποδείξεις.
Ελπίζω να τα πούμε σύντομα!

Με εκτίμηση,
Τσίχλης Ηλίας


//------------------------------------------------------------------------------------//
