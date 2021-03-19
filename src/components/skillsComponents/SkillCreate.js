import { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from 'framer-motion';

//imports from Material UI:
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const SkillCreate = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(!name||!description){
            setEmptyMessage('Fill up the required fields!!!')
            setEmptyMessageFlag(true)
            
        }
        else{
          setEmptyMessageFlag(false)        
          const skill = {name, description};

          fetch('http://localhost:8000/skills/', {
              method: 'POST',
              headers: { "content-Type" : "application/json" },
              body: JSON.stringify(skill)
          }).then( () => {
              history.goBack()
          })
        }
    }


    return ( 
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="create">
            <Grid container justify='center'>
            {/* <h2>Create a new Skill</h2> */}
          
            <form onSubmit={handleOnSubmit}>

                <Grid item>
                <Typography variant="h4" component="h2" color="secondary">
                    Create new Skill
                </Typography>
                {emptyMessageFlag && 
                        <Typography variant="body1" gutterBottom color="secondary">
                            {emptyMessage}
                        </Typography>}                
                </Grid>  
                {/* <label>Skill's Name:</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} /> */}
                <Grid item>
                <TextField onChange={(e) => setName(e.target.value)} value={name} required  id="standard-required" label="Skill's Name:" defaultValue={name} />
                </Grid>
                {/* <label>Skill's Description:</label> */}
                {/* <textarea required value={description} onChange={(e) => setDescription(e.target.value)}></textarea> */}
                <Grid item>
                <TextField value={description} onChange={(e) => setDescription(e.target.value)} required  id="standard-required" label="Skill's Description:" /> 
                {/* <button>Add new Skill!</button> */}
                </Grid>
                <Grid item>
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover">                     
                <Button onClick={handleOnSubmit} variant="outlined" color="secondary">Add new Skill!</Button>
                </motion.div>                 
                </Grid>

            </form>
        </Grid>
        </motion.div>
     );
}
 
export default SkillCreate;