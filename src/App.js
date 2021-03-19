import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import Home from './components/Home';
import React, { useState } from "react";

//import skill Components
import SkillList from './components/skillsComponents/SkillList';
import SkillDetails from './components/skillsComponents/SkillDetails';
import SkillCreate from './components/skillsComponents/SkillCreate';
import NotFound404 from './components/NotFound404';
import SkillUpdate from './components/skillsComponents/SkillUpdate';

//import EmployeeComponents
import EmployeeList from './components/EmployeesComponents/EmployeeList';
import EmployeeDetails from './components/EmployeesComponents/EmployeeDetails';
import EmployeeCreate from './components/EmployeesComponents/EmployeeCreate';
import EmployeeUpdate from './components/EmployeesComponents/EmployeeUpdate';

//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import { Switch as Switcher, Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Fouter from './components/Fouter';
const { default: Navbar } = require("./components/Navbar");


function App() {

  const location = useLocation();

	const [darkMode, setDarkMode] = useState(true);

	const theme = createMuiTheme({
		palette: {
			type: darkMode ?"dark" : "light",
			},
    });
      
  return (
    <div className="App">
			<ThemeProvider theme={theme}>
				<Paper style={{ height: "100vh"}}>     
      {/* <BrowserRouter> */}
      <Grid container style={{  display: "grid",
                                minHeight: "100vh",
                                gridTemplateRows: "auto 1fr auto",
                                gridTemplateColumns: "100%"
                                }}> 
        <Grid item container xs={12} style={{textAlign:'right'}}>
        <Grid item xs={12}>
        <Switcher checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
        </Grid>
        <Grid item xs={12}>
        <Navbar />
        </Grid>
        </Grid>
        <Grid item xs={12} style={{textAlign:'center'}}>
        <div className="content">
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route exact path="/">
              <Home />
            </Route>
            {/* --- Skills Routes --- */}
            <Route exact path="/skills">
              <SkillList />
            </Route>
            <Route exact path="/skills/create">
              <SkillCreate />
            </Route>              
            <Route exact path="/skills/:id">
              <SkillDetails />
            </Route>
            <Route exact path="/skills/:id/update">
              <SkillUpdate />
            </Route>  
            {/* --- Employees Routes --- */} 
            {/* Old School xD!!! */}     
            <Route exact path="/employees" component={EmployeeList}/>                   
            <Route exact path="/employees/create" component={EmployeeCreate}/>             
            <Route exact path="/employees/:id" component={EmployeeDetails}/>           
            {/* --- 404 Routes --- */}
            <Route exact path="/employees/:id/update">
              <EmployeeUpdate />
            </Route>                         
            <Route path="*">
              <NotFound404 />
            </Route>                                       
          </Switch>
        </AnimatePresence>
        </div>
        </Grid>
        </Grid>
        <Grid item xs={12}>
          <Fouter/>  
        </Grid>   
      {/* </BrowserRouter> */}
      </Paper>
    </ThemeProvider>   
    </div>
  );
}

export default App;
