import React, { Component } from 'react'
import EmployeeCreateCustomSkill from './EmployeeCreateCustomSkill';
import { motion } from 'framer-motion';

//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

const containerVariants = {
    hidden: { 
        opacity: 0, 
        x: '100vw' 
      },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { type: 'spring', delay: 0.5 }
      },
      exit: {
        x: "-100vh",
        transition: { ease: 'easeInOut' }
      }
    };

    const buttonVariants = {
        hover: {
          scale: 1.1,
          textShadow: "0px 0px 8px rgb(255,255,255)",
          boxShadow: "0px 0px 8px rgb(255,255,255)",
          transition: {
            duration: 0.3,
            yoyo: Infinity
          }
        }
      } 

class EmployeeCreate extends Component {

    constructor(props){
        super(props);

        //this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    // setofskills
    state = {
        firstname: '',
        middlename: '',
        lastname: '',
        address: '',
        City: '',
        phonenumber: '',
        email: '',
        // State part for checkbox
        setOfSkills: [],
        setOfPickedSkills: [],
        existingSkills: [],
        setOfPickedSkillsWithDescription: [],
        // state part for custom skills
        customSkills: [],
        // state part for error and pending        
        isPending: true,
        error: '',
        emptyMessageFlag: false,
        emptyMessage: ''
      }

      componentDidMount(){
        const abortCont = new AbortController();

        fetch('http://localhost:8000/skills', {signal: abortCont.signal})
        .then(res => {
            //console.log(res)
            if(!res.ok){ // Error back from our server
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            const newSetOfSkills = data.map(el => el.name)
            const newState = Object.assign({}, this.state, {existingSkills: data, setOfSkills: newSetOfSkills, isPending: false})
            
            this.setState(newState)
            console.log(this.state.existingSkills)
            console.log(this.state.setOfSkills)
        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
            } else {
                const newState = Object.assign({}, this.state, {isPending: false, error: err.message})
                this.setState(newState)                
            }
        })
      }  

    handleOnSubmit(e){
        e.preventDefault();
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(!this.state.firstname||!this.state.middlename||!this.state.lastname||!this.state.address||!this.state.City||!this.state.phonenumber||!this.state.email){
            const newState = Object.assign({}, this.state, {emptyMessageFlag: true, emptyMessage: 'Fill up the required fields!!!'})
            this.setState(newState)
        }
        else if(!re.test(String(this.state.email).toLowerCase())){
            const newState = Object.assign({}, this.state, {emptyMessageFlag: true, emptyMessage: 'Give a valid Email!!!'})
            this.setState(newState)
        }
        else{
            const newState = Object.assign({}, this.state, {emptyMessageFlag: false})
            this.setState(newState)
            //Fisrt we need to save Custom skills in our dataBase!
            
            fetch('http://localhost:8000/skills/many', {
                method: 'POST',
                headers: { "content-Type" : "application/json" },
                body: JSON.stringify(this.state.customSkills)
            })
            .then((res) => {
                return res.json()
            })
            .then(data => {
                // if(data){                
                    if(data.err){
                        this.setState(data.err)
                        return console.log(data)                  
                    }else{ 
                        //Saved data successfully
                        const skillsForSubmit = this.state.setOfPickedSkillsWithDescription.concat(data)
                        
                        const newEmployee = {
                            firstname: this.state.firstname,
                            middlename: this.state.middlename,
                            lastname: this.state.lastname,
                            address: this.state.address,
                            City: this.state.City,
                            phonenumber: this.state.phonenumber,
                            email: this.state.email,
                            setofskills: skillsForSubmit,
                        } 
                        console.log(newEmployee)
                        fetch('http://localhost:8000/employees/', {
                            method: 'POST',
                            headers: { "content-Type" : "application/json" },
                            body: JSON.stringify(newEmployee)
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.err){
                                this.setState(data.err)
                                return console.log(data)                             
                            }else{
                                // Employee Saved!!
                                this.props.history.go(-1);     
                            }
                        }) 

                        
                    }
                // }else{
                    return console.log(data)
                // }
                                            
            })
            .catch(err => console.log(err))

            // this.props.history.go(-1)
            console.log("this:",this)
        }
    }      

    handleToggle = (e) => {
        if(this.state.setOfPickedSkills.includes(e.target.value)){
            this.setState({setOfPickedSkills: this.state.setOfPickedSkills.filter(skill => skill!== e.target.value), setOfPickedSkillsWithDescription: this.state.setOfPickedSkillsWithDescription.filter(skill => skill.name!==e.target.value)})        
        }else{
            // const newSetOfPickedSkills = this.state.setOfPickedSkills.concat(e.target.value)
            //or
            const newSetOfPickedSkills = [...this.state.setOfPickedSkills, e.target.value]
            const newSetOfPickedSkillsWithDescription = this.state.setOfPickedSkillsWithDescription.concat(this.state.existingSkills.filter(skill => skill.name===e.target.value))
            this.setState({setOfPickedSkills: newSetOfPickedSkills, setOfPickedSkillsWithDescription: newSetOfPickedSkillsWithDescription})
        }       
    }

    handePlusClick = (e) => {

        const newCustomSkill = [{name: '', description: ''}]
        const newCustomSkills = this.state.customSkills.concat(newCustomSkill)
        this.setState({customSkills: newCustomSkills})
        console.log('hi')
        console.log(this.state.customSkills)
    
    }
    
    callback = (name, description, num) => {
        const newCustomSkill = {name, description}
        const newCustomSkills = this.state.customSkills.map((customSkill, id) => {
            if(id === num){
                return newCustomSkill
            }else{
                return customSkill
            }
        })

        this.setState({customSkills: newCustomSkills})

    }

    render() { 
        return (
            <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="create">

            <div className="create">

            { this.state.error && <div> { this.state.error } </div> }
           
            { this.state.existingSkills &&  !this.state.error &&
            <div>    
            <form onSubmit={this.handleOnSubmit}>
            <Grid container item xs={12} spacing={4} justify="center" style={{textAlign:"center"}}>
            
            <Grid item xs={12}>                           
            {/* <h2>Create a new Employee</h2> */}
            <Typography variant="h4" gutterBottom color="secondary">
                Create Employee
            </Typography>
            {this.state.emptyMessageFlag && 
                        <Typography variant="body1" gutterBottom color="secondary">
                            {this.state.emptyMessage}
                        </Typography>}                   
            </Grid>                           
                <Grid item xs={12} md={6} lg={4} >
                <TextField fullWidth required id="standard-required" label="Employee's FirstName:" 
                    value={this.state.firstname} onChange={(e) => this.setState({firstname: e.target.value})}/>                
                </Grid>                   
                {/* <label>Employee's FirstName:</label> */}
                {/* <input type="text" required value={this.state.firstname} onChange={(e) => this.setState({firstname: e.target.value})} /> */}
               
                <Grid item xs={12} md={6} lg={4} >
                    <TextField fullWidth required id="standard-required" label="Employee's Middlename:" 
                    value={this.state.middlename} onChange={(e) => this.setState({middlename: e.target.value})}/>                    
                </Grid>               
                {/* <label>Employee's MiddleName:</label> */}
                {/* <input type="text" required value={this.state.middlename} onChange={(e) => this.setState({middlename: e.target.value})} /> */}
                <Grid item xs={12} md={6} lg={4}>
                    <TextField fullWidth required id="standard-required" label="Employee's LastName:" 
                    value={this.state.lastname} onChange={(e) => this.setState({lastname: e.target.value})}/>                      
                </Grid>                
                {/* <label>Employee's LastName:</label> */}
                {/* <input type="text" required value={this.state.lastname} onChange={(e) => this.setState({lastname: e.target.value})} /> */}
                <Grid item xs={12} md={6} lg={4}>    
                    <TextField fullWidth required id="standard-required" label="Employee's Address:" 
                    value={this.state.address} onChange={(e) => this.setState({address: e.target.value})}/>                   
                </Grid>                
                {/* <label>Employee's address:</label> */}
                {/* <input type="text" required value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} /> */}
                <Grid item xs={12} md={6} lg={4}>
                    <TextField fullWidth required id="standard-required" label="Employee's City:" 
                    value={this.state.City} onChange={(e) => this.setState({City: e.target.value})}/>                  
                </Grid>                
                {/* <label>Employee's City:</label> */}
                {/* <input type="text" required value={this.state.City} onChange={(e) => this.setState({City: e.target.value})} /> */}
                <Grid item xs={12} md={6} lg={4}>
                    <TextField fullWidth required id="standard-required" label="Employee's Phonenumber:" 
                    value={this.state.phonenumber} onChange={(e) => this.setState({phonenumber: e.target.value})}/>                   
                </Grid>               
                {/* <label>Employee's phonenumber:</label> */}
                {/* <input type="text" required value={this.state.phonenumber} onChange={(e) => this.setState({phonenumber: e.target.value})} /> */}
                <Grid item xs={12}>

                    <TextField fullWidth inputProps={{type:"email"}} required id="standard-required" label="Employee's Email:" 
                    value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>                     
                </Grid>

                

                {/* <label>Employee's email:</label> */}
                {/* <input type="email" required value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} /> */}

                { this.state.isPending && <div> Loading... </div> }
                <Grid item container xs={12} justify="center"> 
                <div>
                {/* <h2>Chose existing Skills to include them in the SkillsSet:</h2> */}
                <Grid item xs={12}>                           
                <Typography variant="h5" gutterBottom color="secondary">
                    Chose existing Skills to include them in the SkillsSet:
                </Typography>      
                </Grid>
                <Grid item xs={12}>                                 
                {this.state.setOfSkills.map((skillname,num) => 
                    <div key={num}>
                    {/* <input */}
                    <Checkbox
                    type="checkbox"
                    onChange={this.handleToggle}
                    
                    name={skillname}
                    value={skillname}
                    id={num}
                    />
                
                <label htmlFor={skillname}>{skillname}</label><br/>                
                </div>
                )}
                </Grid>
                               
                </div>
                </Grid>
                <Paper>
                <div className="create">
                
                <Grid item container xs={12}>    
                    <Grid item xs={12}>                           
                    <Typography variant="h5" gutterBottom color="secondary">
                        Create new Skills to include them in SkillsSet (Optional):
                    </Typography>      
                    </Grid>
                    <Grid item xs={12}>                           
                    <Typography variant="h6" gutterBottom color="secondary">
                         Note: new skills will be submited in your skill"s database!
                    </Typography>      
                    </Grid>                                              
                    {/* <h2>Create new Skills to include them in SkillsSet (Optional):</h2> */}
                    {/* <h3>Note: new skills will be submited in your skill"s database!</h3>  */}
                    {/* this.state.customSkills &&  */}
                    <Grid item xs={12}>                     
                    {
                    this.state.customSkills.map((customSkill, num) => <EmployeeCreateCustomSkill key={num} customSkill={customSkill} num={num} parrentCallback={this.callback} />) 
                    }
                    </Grid> 
                    <Grid item xs={12}>                    
                        {/* <button type="button" onClick={this.handePlusClick}>+</button> */}
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"> 
                        <Button onClick={this.handePlusClick} variant="outlined" color="secondary">+</Button>
                        </motion.div>
                    </Grid>
                </Grid> 
                                   
                </div>                                
                <Grid item xs={12}>
                {/* <button>Add new Employee!</button> */}
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover">                
                <Button onClick={this.handleOnSubmit} variant="outlined" color="secondary">Add new Employee!</Button>              
                </motion.div>
                </Grid>
                </Paper>   
            </Grid>        
            </form>
            </div>}
        </div>  
        </motion.div>          
          );
    }
}
 
export default EmployeeCreate;