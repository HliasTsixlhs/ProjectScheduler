import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import EmployeeCreateCustomSkill from './EmployeeCreateCustomSkill';
import { motion } from 'framer-motion';

//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


  
// Animation's Variants
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


class EmployeeDetails extends Component {


    
    constructor(props){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSkillDetach = this.handleSkillDetach.bind(this);        
    }

    state = {
        employee: [],
        isPending: true,
        error: '',
        // state part for custom skills
        customSkills: [],
        emptySkillsMessage: false,
        AssignSkillsButtonToggle: false,        
      }

    componentDidMount(){
        const abortCont = new AbortController();

        const id = this.props.match.params.id

        fetch(`http://localhost:8000/employees/${id}`, {signal: abortCont.signal})
        .then(res => {
            //console.log(res)
            if(!res.ok){ // Error back from our server
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            if(data.err){
                this.setState({error: data.err,isPending: false})
            }else{
                const newState = Object.assign({}, this.state, {employee: data, isPending: false})
                this.setState(newState)
                console.log(this.state.employee)
            }
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


    handleOnClick(){
        fetch('http://localhost:8000/employees/' + this.state.employee._id, {
            method: 'DELETE'
        }).then( () => {
            this.props.history.go(-1);
        }).catch(err => {
            console.log(err);
        })
    }

    handleSkillDetach(skillForDetach){

        // fetch('http://localhost:8000/skills/' + skillForDetach._id, {
        //     method: 'DELETE'
        // }).then( (res) => res.json())
        // .then(data => {
        //     if(data.err){
        //         this.setState({error: data.err})
        //     }else{
            const newSetOfSkills = this.state.employee.setofskills.filter(skill => skill!==skillForDetach )
            const newEmployee = Object.assign({},this.state.employee)
            newEmployee.setofskills = newSetOfSkills
            // console.log(skillForDetach._id)
            fetch(`http://localhost:8000/employees/${newEmployee._id}/update`, {
                method: 'PUT',
                headers: { "content-Type" : "application/json" },
                body: JSON.stringify(newEmployee)
            })
            .then( res => res.json())
            .then(data => {     
                if(data.err){
                    this.setState({error: data.err})
                }else{                                     
                    this.setState({employee: newEmployee})
                } 
            })
            .catch(err => {
                console.log(err);
                this.setState({error: err})
            })
            
        //     }
        // })

        // console.log(this.state.employee) 
    }

    handePlusClick = (e) => {

        const newCustomSkill = [{name: '', description: ''}]
        const newCustomSkills = this.state.customSkills.concat(newCustomSkill)
        this.setState({customSkills: newCustomSkills, AssignSkillsButtonToggle: true})

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

    handeCustomSkills = () => {
        let exit = false
        this.state.customSkills.forEach(customSkill => {
            if(!customSkill.name || !customSkill.description) {
                exit = true
            }
        })

        if(exit){
            // this.state.emptySkillsMessage = true
            this.setState({emptySkillsMessage: true})
            return
        }else{
            this.setState({emptySkillsMessage: false})
        }
        fetch('http://localhost:8000/skills/many', {
            method: 'POST',
            headers: { "content-Type" : "application/json" },
            body: JSON.stringify(this.state.customSkills)
        })
        .then((res) => {
            this.setState({AssignSkillsButtonToggle: false})
            return res.json()
        })
        .then(data => {
            // if(data){                
                if(data.err){
                    this.setState(data.err)
                    return console.log(data)                  
                }else{ 
                    //Saved data successfully
                    const newSetOfSkills = this.state.employee.setofskills.concat(data)
                    const newEmployee = Object.assign({}, this.state.employee)
                    newEmployee.setofskills = newSetOfSkills                    
                    fetch(`http://localhost:8000/employees/${newEmployee._id}/update`, {
                        method: 'PUT',
                        headers: { "content-Type" : "application/json" },
                        body: JSON.stringify(newEmployee)
                    })
                    .then( res => res.json())
                    .then(data => {     
                        if(data.err){
                            this.setState({error: data.err})
                        }else{                                     
                            this.setState({employee: newEmployee})
                        } 
                    }) 

                }
                return console.log(data)                          
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit">    
            <Grid container justify='center' style={{textAlign:'center'}}>
            <div className="skill-details">
            
            { this.state.isPending && <div>Loading...</div> }
            { this.state.error && <div> { this.state.error } </div> }
            { this.state.employee && !this.state.error && (
                <article>
                    {/* <h1>Employee's firstname:</h1>                    
                    <h2>{this.state.employee.firstname}</h2>
                    <h1>Employee's middlename:</h1>                    
                    <h2>{this.state.employee.middlename}</h2>                    
                    <h1>Employee's lastname:</h1>
                    <h2>{this.state.employee.lastname} </h2>
                    <h1>Employee's address:</h1>                    
                    <h2>{this.state.employee.address}</h2>
                    <h1>Employee's City:</h1>                    
                    <h2>{this.state.employee.City}</h2>                    
                    <h1>Employee's phonenumber:</h1>
                    <h2>{this.state.employee.phonenumber} </h2>
                    <h1>Employee's email:</h1>                    
                    <h2>{this.state.employee.email}</h2> */}
                    <Grid item xs={12}>
                    <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Type</StyledTableCell>
                            <StyledTableCell align="center">Value</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key={"Employee's firstname:"}>
                            <StyledTableCell component="th" scope="row">Employee's firstname:</StyledTableCell>
                            <StyledTableCell align="center">{this.state.employee.firstname}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={"Employee's middlename:"}>
                            <StyledTableCell component="th" scope="row">Employee's middlename:</StyledTableCell>
                            <StyledTableCell align="center">{this.state.employee.middlename}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={"Employee's lastname:"}>
                            <StyledTableCell component="th" scope="row">Employee's lastname:</StyledTableCell>
                            <StyledTableCell align="center">{this.state.employee.lastname}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={"Employee's address:"}>
                            <StyledTableCell component="th" scope="row">Employee's address:</StyledTableCell>
                            <StyledTableCell align="center">{this.state.employee.address}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={"Employee's City:"}>
                            <StyledTableCell component="th" scope="row">Employee's City:</StyledTableCell>
                            <StyledTableCell align="center">{this.state.employee.City}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={"Employee's phonenumber:"}>
                            <StyledTableCell component="th" scope="row">Employee's phonenumber:</StyledTableCell>
                            <StyledTableCell align="center">{this.state.employee.phonenumber}</StyledTableCell>
                            </StyledTableRow> 
                            <StyledTableRow key={"Employee's email:"}>
                            <StyledTableCell component="th" scope="row">Employee's email:</StyledTableCell>
                            <StyledTableCell align="center">{this.state.employee.email}</StyledTableCell>
                            </StyledTableRow>                                                                        
                        </TableBody>
                    </Table>
                    </TableContainer>
                    

                    <Link to={`/employees/${this.state.employee._id}/update`}>
                        {/* <button>Update Employee's Pernson Details</button> */}
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover">                        
                        <Button variant="outlined" color="secondary">Update Employee's Pernson Details</Button>
                        </motion.div>
                    </Link>
                    <br/>    
                    <Divider />   
                    </Grid>
                    
                                 
                    {/* <h1>Set of Skills:</h1> */}
                    <Grid item xs={12} >
                    <Typography variant="h3" gutterBottom color="secondary">
                        Set of Skills:
                    </Typography> 
                    </Grid>
                    <Grid container item xs={12} > 
                                       
                    {this.state.employee.setofskills && this.state.employee.setofskills.map((skill, i) => (
                            <Grid item xs={12} md={6} lg={4}> 
                            <div key={i}> 
                                                          
                                {/* <h1>Employee's skill-{i}:</h1>
                                <h1>name:</h1>                                                    
                                <h2>{skill.name}</h2>                    
                                <h1>description:</h1>
                                <h2>{skill.description}</h2> */}
{/*  */}
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography color="textPrimary" gutterBottom>
                                        Employee's skill-{i}:
                                    </Typography>
                                    <Divider />
                                    <Typography variant="h5" component="h2" color="textSecondary">
                                        Skill name:
                                    </Typography>
                                    <Typography variant="h5" component="h2" color="textPrimary">
                                        {skill.name}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="h6" component="h2" color="textSecondary">
                                        Skill description:
                                    </Typography>
                                    <Typography variant="h6" component="h2" color="textPrimary">
                                    {skill.description}
                                    </Typography>                
                                </CardContent>
                                {/* <CardActions>
                                    {skill.description}
                                </CardActions> */}
                            </Card>
{/*  */}

                                {/* <button onClick={() => this.handleSkillDetach(skill)}>Skill detach</button> */}
                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover">                                
                                <Button onClick={() => this.handleSkillDetach(skill)} variant="outlined" color="secondary">Skill detach</Button>            
                                </motion.div>                            
                            </div>
                            </Grid>
                            
                    ))}
                    </Grid>
                    <Divider />
                <Grid item xs={12} >
                    <Paper>
                    <div className="create">
                        {/* <h2>Create new Skills to include them in SkillsSet (Optional):</h2> */}
                        {/* <h3>Note: new skills will be submited in your skill"s database!</h3> */}
                        <Typography variant="h4" gutterBottom color="secondary">
                            Create new Skills to include them in SkillsSet (Optional):
                        </Typography>
                        <Typography variant="h5" gutterBottom color="secondary">
                        Note: new skills will be submited in your skill"s database!
                        </Typography>                          
                        {
                        this.state.AssignSkillsButtonToggle && this.state.customSkills.map((customSkill, num) => <EmployeeCreateCustomSkill key={num} customSkill={customSkill} num={num} parrentCallback={this.callback} />) 
                        }
                        {this.state.emptySkillsMessage && 
                        <Typography variant="body1" gutterBottom color="secondary">
                            Fill up the required fields!!!
                        </Typography>}
                        {/* <button type="button" onClick={this.handePlusClick}>+</button> */}
                        {/* <Button type="button" onClick={this.handePlusClick} variant="outlined" color="secondary"><Icon color="primary">AddCircleOutline</Icon></Button> */}
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover">                        
                        <IconButton color="secondary" aria-label="add" onClick={this.handePlusClick} >
                            <AddCircleOutline fontSize="large" />
                        </IconButton>
                        </motion.div>                        
                        {this.state.AssignSkillsButtonToggle && 
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover">
                            <Button onClick={this.handeCustomSkills} variant="outlined" color="secondary">Assign new Skills</Button>
                        </motion.div>} 
                        {/* <button onClick={this.handeCustomSkills}>Assign new Skills</button>} */}
                    </div>                                                       
                                                            
                    {/* <button onClick={this.handleOnClick}>Delete</button> */}
                    <motion.div
                        variants={buttonVariants}
                        whileHover="hover">
                    <Button onClick={this.handleOnClick} variant="outlined" color="secondary">Delete</Button>
                    </motion.div>
                </Paper>
                </Grid>     
                </article>
            )}
        
        </div>
        </Grid>
        </motion.div>
         );
    }
}
 
export default EmployeeDetails;

