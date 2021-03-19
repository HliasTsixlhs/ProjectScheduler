import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const SkillUpdate = () => {
        
    const { id } = useParams();

    const [skill, setSkill] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);   
    const history = useHistory();  
    
    const [emptyMessage, setEmptyMessage] = useState('');
    const [emptyMessageFlag, setEmptyMessageFlag] = useState(false)

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
    
        fetch('http://localhost:8000/skills/' + id, {signal: abortCont.signal})
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
                setSkill(data);
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
        if(!skill.name||!skill.description){
            setEmptyMessage('Fill up the required fields!!!')
            setEmptyMessageFlag(true)
            
        }
        else{
            setEmptyMessageFlag(false)         
            console.log(skill);
            fetch(`http://localhost:8000/skills/${id}/update`, {
                method: 'PUT',
                headers: { "content-Type" : "application/json" },
                body: JSON.stringify(skill)
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

        { isPending && <div>Loading...</div> }
        { error && <div> { error } </div> }            
        {skill && (
        // <div className="update">
            <Grid container justify="center">
            {/* <h2>Update Skill</h2> */}
           
            <form onSubmit={handleOnSubmit}>
                <Grid item >
                    <Typography variant="h4" component="h2" color="secondary">
                        Update Skill
                    </Typography>
                    {emptyMessageFlag && 
                        <Typography variant="body1" gutterBottom color="secondary">
                            {emptyMessage}
                        </Typography>}                    
                 </Grid>                 
                {/* <label>New skill's Name:</label> */}
                {/* <input type="text" required value={ skill.name } onChange={(e) => {
                    setSkill(Object.assign({}, skill,{name:  e.target.value}));
                    }} /> */}
                <Grid item>
                    <TextField inputProps={
                        {
                        value: skill.name,
                        onChange:(e) => {setSkill(Object.assign({}, skill,{name:  e.target.value}));},
                        required: true
                        }} 
                        required id="standard-required" label="Skill's Name:" /> 
                </Grid>                
                {/* <label>New skill's Description:</label> */}
                {/* <textarea required value={ skill.description } onChange={(e) => {                    
                    setSkill(Object.assign({}, skill,{description:  e.target.value}));
                    }}></textarea> */}
                <Grid item>                    
                    <TextField inputProps={
                        {
                        value: skill.description,
                        onChange:(e) => {setSkill(Object.assign({}, skill,{description:  e.target.value}));},
                        required: true,
                        }} 
                        required id="standard-required" label="Skill's Description:" />                        
                </Grid>
                {/* <button>Update Skill!</button> */}
                <Grid item>
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover">   
                <Button onClick={handleOnSubmit} variant="outlined" color="secondary">Update Skill!</Button>
                </motion.div>                 
                </Grid>
                <br/>
           
            </form>
        </Grid>            
        // </div>
        )}
        
        </motion.div>       
      );
}
 
export default SkillUpdate;