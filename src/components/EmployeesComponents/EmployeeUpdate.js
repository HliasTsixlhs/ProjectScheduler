import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const EmployeeUpdate = () => {
        
    const { id } = useParams();
    
    const [employee, setEmployee] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);   
    const history = useHistory();


    const [emptyMessage, setEmptyMessage] = useState('');
    const [emptyMessageFlag, setEmptyMessageFlag] = useState(false); 
    
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
    

    useEffect( () => {
        const abortCont = new AbortController();
    
        fetch('http://localhost:8000/employees/' + id, {signal: abortCont.signal})
        .then(res => {
            //console.log(res)
            if(!res.ok){ // Error back from our server
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            if(data.err){
                setIsPending(false);
                setError(data.err);
            }else{
                setIsPending(false);
                setEmployee(data);
                setError(null);
            }
        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
            } else {
                setIsPending(false);
                setError(err.message);
            }
        })
    
        // abort fetch
        return () => abortCont.abort();
    
    },[id])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(!employee.firstname||!employee.middlename||!employee.lastname||!employee.address||!employee.City||!employee.phonenumber||!employee.email){
            setEmptyMessage('Fill up the required fields!!!')
            setEmptyMessageFlag(true)
            
        }
        else if(!re.test(String(employee.email).toLowerCase())){
            setEmptyMessage('Give a valid Email!!!')
            setEmptyMessageFlag(true)            
        }
        else{        
            e.preventDefault();
            setEmptyMessageFlag(false)
            console.log(employee);
            fetch(`http://localhost:8000/employees/${id}/update`, {
                method: 'PUT',
                headers: { "content-Type" : "application/json" },
                body: JSON.stringify(employee)
            }).then( () => {
                //history.push('/skills')
                history.goBack()
            })
        }
    }

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit">        
        <div className="skill-update">
        { isPending && <div>Loading...</div> }
        { error && <div> { error } </div> }            
        {employee && (

        <div className="update">
            <form onSubmit={handleOnSubmit}>
               
            <Grid container item xs={12} spacing={4} justify="center">
            <Grid item xs={12}>
            <Typography variant="h4" gutterBottom color="secondary">
                Update Employee
            </Typography>
            {emptyMessageFlag && 
                        <Typography variant="body1" gutterBottom color="secondary">
                            {emptyMessage}
                        </Typography>}                             
                {/* <h2>Update Employee</h2>           */}
            </Grid>      
            <Grid item xs={12} md={6} lg={4} >
                {/* <label>New employee's FirstName:</label> */}
                {/* <input type="text" required value={ employee.firstname } onChange={(e) => { */}
                    {/* setEmployee(Object.assign({}, employee,{firstname:  e.target.value})); */}
                    {/* }} /> */}
                    <TextField fullWidth required id="standard-required" label="Employee's FirstName:" 
                    value={ employee.firstname } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{firstname:  e.target.value}));
                    }}/>
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                {/* <label>New employee's Middlename:</label>
                <input type="text" required value={ employee.middlename } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{middlename:  e.target.value}));
                    }}></input> */}
                    <TextField fullWidth required id="standard-required" label="Employee's Middlename:" 
                    value={ employee.middlename } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{middlename:  e.target.value}));
                    }}/>                    
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                {/* <label>New employee's LastName:</label>
                <input type="text" required value={ employee.lastname } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{lastname:  e.target.value}));
                    }} /> */}
                    <TextField fullWidth required id="standard-required" label="Employee's LastName:" 
                    value={ employee.lastname } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{lastname:  e.target.value}));
                    }}/>                      
            </Grid>
            <Grid item xs={12} md={6} lg={4}>    
                {/* <label>New employee's Address:</label>
                <input type="text" required value={ employee.address } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{address:  e.target.value}));
                }}></input> */}
                    <TextField fullWidth required id="standard-required" label="Employee's Address:" 
                    value={ employee.address } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{address:  e.target.value}));
                    }}/>                   
            </Grid>    

            <Grid item xs={12} md={6} lg={4}>
                {/* <label>New employee's City:</label>
                <input type="text" required value={ employee.City } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{City:  e.target.value}));
                }}></input> */}
                    <TextField fullWidth required id="standard-required" label="Employee's City:" 
                    value={ employee.City } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{City:  e.target.value}));
                    }}/>                  
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                {/* <label>New employee's Phonenumber:</label>
                <input type="text" required value={ employee.phonenumber } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{phonenumber:  e.target.value}));
                }}></input> */}
                    <TextField fullWidth required id="standard-required" label="Employee's Phonenumber:" 
                    value={ employee.phonenumber } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{phonenumber:  e.target.value}));
                    }}/>                   
            </Grid>

            <Grid item xs={12}>
                {/* <label>New employee's Email:</label>
                <input type="email" required value={ employee.email } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{email:  e.target.value}));
                }}></input>  */}
                    <TextField fullWidth inputProps={{type:"email"}} required id="standard-required" label="Employee's Email:" 
                    value={ employee.email } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{email:  e.target.value}));
                    }}/>                     
            </Grid>
            <motion.div
                variants={buttonVariants}
                whileHover="hover">                                                                              
                <Button onClick={handleOnSubmit} variant="outlined" color="secondary">
                    {/* <button>Update Employee!</button> */}
                    Update Employee!
                </Button>
            </motion.div>
            </Grid>
            
            </form>
        </div>

        )}
    </div>  
    </motion.div>      
      );
}
 
export default EmployeeUpdate;