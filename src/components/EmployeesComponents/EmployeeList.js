import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

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


class EmployeeList extends Component {
    

    // constructor(props){
    //     super(props)
    // }

    state = {
        employees: [],
        isPending: true,
        error: '',
        // State for Multiple-Delete
        deleteButtonOpen: false,
        employeesForDeletion: [],
        // State for SearchField
        searchField: '',
        initialEmployess: [],
        searchOnSkillField: '',
      }

    componentDidMount(){
        const abortCont = new AbortController();

        fetch('http://localhost:8000/employees', {signal: abortCont.signal})
        .then(res => {
            //console.log(res)
            if(!res.ok){ // Error back from our server
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            const newState = Object.assign({}, this.state, {employees: data, initialEmployess: data, isPending: false})
            
            this.setState(newState)
            console.log(this.state.employees)
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

    handleOrderByLastnameAscending = () => {
        // array.sort() is Mutator function!! So..
        console.log([...this.state.employees])
        const SortedEmployees = [...this.state.employees].sort((a, b) => a.lastname>b.lastname)
        this.setState({employees: SortedEmployees})
    }

    handleOrderByLastnameDescending = () => {
        // array.sort() is Mutator function!! So..        
        // const SortedEmployees = [...this.state.employees].sort().reverse()
        const SortedEmployees = [...this.state.employees].sort((a, b) => a.lastname>b.lastname).reverse()       
        this.setState({employees: SortedEmployees})
    }

    handleOrderByHiringDateAscending = () => {
        // array.sort() is Mutator function!! So..
        // By default, the sort() function sorts values as strings.
        // We fix this by providing a compare function !!! W3schools ftw xD
        console.log([...this.state.employees])
        const SortedEmployees = [...this.state.employees].sort((a, b) => a.createdAt>b.createdAt)
        this.setState({employees: SortedEmployees})
    }

    handleOrderByHiringDateDescending = () => {
        // array.sort() is Mutator function!! So..        
        // By default, the sort() function sorts values as strings.
        // We fix this by providing a compare function !!! W3schools ftw xD
        const SortedEmployees = [...this.state.employees].sort((a, b) => a.createdAt>b.createdAt).reverse()       
        this.setState({employees: SortedEmployees})
    }   
    
    
    //Function for multi delete
    handleMultiDeleteToggle = (e) => {
        if(this.state.deleteButtonOpen === false){ //Open the button
            e.target.innerHTML = 'UnToggle multi delete'
            this.setState({deleteButtonOpen: true})

        }else{                                     //Close the button
            e.target.innerHTML = 'Toggle multi delete'       
            this.setState({deleteButtonOpen: false})

        }
    }

    handleMultiDelete = () => {
        let Ids = Object.assign({})
        Ids = this.state.employeesForDeletion.map(employee => Object.assign({}, Ids, {_id: employee._id}))
        console.log(Ids)
        // console.log(this.state.employeesForDeletion)
        fetch('http://localhost:8000/employees/manydelete', {
            method: 'DELETE',
            headers: { "content-Type" : "application/json" },
            body: JSON.stringify(Ids)
        })        
        .then((res) => {
            return res.json()
        }).then(data => {
            if(data.err){
                this.setState({error: data.err})
                return console.log(data)
            }
            else{
                // After Success Deletion we need to re-GET Employees! 
                const abortCont = new AbortController();
                fetch('http://localhost:8000/employees', {signal: abortCont.signal})
                .then(res => {
                    //console.log(res)
                    if(!res.ok){ // Error back from our server
                        throw Error('could not fetch the data for that resource')
                    }
                    return res.json();
                })
                .then(data => {
                    const newState = Object.assign({}, this.state, {employees: data, initialEmployess: data, isPending: false})
                    
                    this.setState(newState)
                    console.log(this.state.employees)
                })
                .catch(err => {
                    if(err.name === 'AbortError'){
                        console.log('fetch aborted')
                    } else {
                        const newState = Object.assign({}, this.state, {isPending: false, error: err.message})
                        this.setState(newState)                
                    }
                })                
                return console.log(data)                
            }

        }).catch(err => {
            console.log(err)
            this.setState({error: err})
        })        
    }

    handleCheckboxToggle = (employeeCurrent) => {
        if(this.state.employeesForDeletion.includes(employeeCurrent)){ // remove employee if exists
            // filter isnt mutator!! So:
            this.setState({employeesForDeletion: this.state.employeesForDeletion.filter(employee => employee!== employeeCurrent)})        
        }else{                                                        // add employee if exists
            // concat isnt mutator!! So:     
            this.setState({employeesForDeletion:this.state.employeesForDeletion.concat(employeeCurrent)})
        } 
    }

    handleSearchField = (e) => {
        this.setState({searchField: e.target.value})
        if(e.target.value === ''){
            this.setState({employees: this.state.initialEmployess})
        }else{
            this.setState({employees: this.state.initialEmployess.filter(employee => employee.firstname===e.target.value || employee.lastname===e.target.value )})
        }
    }

    handleOnSkillSearchField = (e) => {
        this.setState({searchOnSkillField: e.target.value})
        if(e.target.value === ''){
            this.setState({employees: this.state.initialEmployess})
        }else{

            this.setState({employees: this.state.initialEmployess.filter(employee => {
                let exist = false
                employee.setofskills.forEach(skill => {
                    if(skill.name === e.target.value){
                        exist = true
                    }
                })
                return exist
                })
            })            
        }        
    }

    render() { 
        return (
            <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <Grid container xs={12} justify={'center'} style={{textAlign:"center"}}>
            { this.state.error && <div>{ this.state.error }</div> }
            { this.state.isPending && !this.state.error && <div> Loading... </div> }
            { this.state.employees && !this.state.error && 
                <div>
                <Grid container item xs={12}>
                <Grid container item xs={12} md={6} style={{textAlign:"center"}}>
                {/* {   <button onClick ={this.handleOrderByLastnameAscending}>Order by lastname | ascending </button> } */}
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover">
                <Button onClick={this.handleOrderByLastnameAscending} variant="outlined" color="secondary">Order by lastname | ascending</Button>
                </motion.div>
                {/* {   <button onClick ={this.handleOrderByLastnameDescending}>Order by lastname | descending</button> } */}
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover">                
                    <Button onClick={this.handleOrderByLastnameDescending} variant="outlined" color="secondary">Order by lastname | descending</Button>  
                </motion.div>
                </Grid>
                {/* {   <button onClick ={this.handleOrderByHiringDateAscending}>Order by hiringDate | ascending</button> } */}
                <Grid container item xs={12} md={6} style={{textAlign:"center"}}>
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover">                
                    <Button onClick={this.handleOrderByHiringDateAscending} variant="outlined" color="secondary">Order by hiringDate | ascending</Button>
                </motion.div>
                {/* {   <button onClick ={this.handleOrderByHiringDateDescending}>Order by hiringDate | descending</button> } */}
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover">                
                    <Button onClick={this.handleOrderByHiringDateDescending} variant="outlined" color="secondary">Order by hiringDate | descending</Button>  
                </motion.div>
                </Grid>
                <br/>
                <TextField fullWidth value={this.state.searchField} onChange={this.handleSearchField} id="standard-search" label="Search based on FirstName|LastName" type="search" />                                          
                {/* <label>Search based on FirstName|LastName:</label> */}
                {/* <input type="text"  value={this.state.searchField} onChange={this.handleSearchField} />                     */}
                <br/>
                <TextField fullWidth value={this.state.searchOnSkillField} onChange={this.handleOnSkillSearchField} id="standard-search" label="Search based on skill's name:" type="search" />                 
                {/* <label>Search based on skill's name:</label> */}
                {/* <input type="text"  value={this.state.searchOnSkillField} onChange={this.handleOnSkillSearchField} />  */}
                </Grid>
                <Grid container item >
                    {/* <Grid item xs={12} md={4} lg={4}>  */}
                    {
                        this.state.employees.map(employee => (
                            <Grid item xs={12} md={6} lg={4}>
                            <div className="skill-preview" key={employee._id} >
                                {/* <Link to={`/employees/${employee._id}`}>
                                    <h2>FirstName:</h2>
                                    <p> { employee.firstname }</p>
                                    <h2>LastName:</h2> 
                                    <p> { employee.lastname }</p>
                                    <h2>Hiring date:</h2> 
                                    <p> { employee.createdAt }</p>                                    
                                  
                                </Link> */}                               
                                <Link to={`/employees/${employee._id}`}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="h2" color="textSecondary">
                                            FirstName:
                                        </Typography>
                                        <Typography variant="h5" component="h2" color="textPrimary">
                                            { employee.firstname }
                                        </Typography>
                                        <Divider />
                                        <Typography variant="h6" component="h2" color="textSecondary">
                                            LastName:
                                        </Typography>
                                        <Typography variant="h6" component="h2" color="textPrimary">
                                        { employee.lastname }
                                        </Typography>
                                        <Typography variant="h6" component="h2" color="textSecondary">
                                            Hiring date:
                                        </Typography>
                                        <Typography variant="h6" component="h2" color="textPrimary">
                                        { employee.createdAt }
                                        </Typography>                                                        
                                    </CardContent>
                                    {/* <CardActions>
                                        {skill.description}
                                    </CardActions> */}
                                </Card>
                                </Link>                                
                                { this.state.deleteButtonOpen === true && 
                                    // <input
                                    <Checkbox
                                    type="checkbox"
                                    onChange={() => this.handleCheckboxToggle(employee)}
                                    
                                    name={employee.lastname}
                                    value={employee}
                                    id={employee._id}
                                    />                                
                                } 
                                
                            </div>
                            </Grid>
                        ))
                    }
                    {/* </Grid> */}
                </Grid>
                   
                </div>
            
            }
            <Grid item xs={12} style={{textAlign:"center"}}>
            { this.state.employees && <Link to="/employees/create"> 
            <motion.div
                variants={buttonVariants}
                whileHover="hover">            
                <Button variant="outlined" color="secondary">Create New employee</Button> 
            </motion.div>
            {/* <button>Create New employee</button> */}
            </Link> }
            { this.state.employees && 
            <motion.div
                variants={buttonVariants}
                whileHover="hover"> 
                <Button onClick={this.handleMultiDeleteToggle} variant="outlined" color="secondary">Toggle multi delete</Button>
                </motion.div>
                }
            {/* <button onClick={this.handleMultiDeleteToggle}>Toggle multi delete</button> } */}
            { this.state.deleteButtonOpen && 
            <motion.div
                variants={buttonVariants}
                whileHover="hover">             
            <Button onClick={this.handleMultiDelete} variant="outlined" color="secondary">Delete</Button> 
            </motion.div>            
            }  
            {/* <button onClick={this.handleMultiDelete}>Delete</button> }             */}
            </Grid>
        </Grid>
        </motion.div>
        );
    }
}
 
export default EmployeeList;