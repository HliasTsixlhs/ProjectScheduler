
import { Link } from 'react-router-dom';
import useFetch from '../../customHooks/useFetch';
import { motion } from 'framer-motion';


//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';




const SkillList = () => {

    const { error, isPending, data: skills} = useFetch('http://localhost:8000/skills')
    
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
    
    return (
        <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"> 
        <div className="skill-list">
        <Grid container justify='center' style={{ textAlign: "center"}}>
            <Grid item xs={12} >
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { skills && 
                <div>
                {/* <Grid item xs={12}>                    */}
                    {
                        skills.map(skill => (
                            <motion.div 
                            whileHover={{ scale: 1.3, color: '#f8e112' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="skill-preview" key={skill._id} >
                                <Link to={`/skills/${skill._id}`}>
                                    {/* <h2>{ skill.name }</h2> */}
                                    <Typography variant="h6" component="h2" color="textPrimary">
                                        { skill.name }
                                    </Typography>                                    
                                </Link>
                            </motion.div>
                        ))
                    }
                {/* </Grid>  */}
                </div>
            
            }
            </Grid>
            <Grid item xs={12}>
            { skills && <Link to="/skills/create">
            <motion.div
                variants={buttonVariants}
                whileHover="hover">
            <Button variant="outlined" color="secondary">Create New Skill</Button>  
            </motion.div>                               
            {/* <button>Create New Skill</button> */}
            </Link> }

            { skills && <a href="http://localhost:8000/skills/excel" rel="noreferrer" target="_blank">
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover">               
                <Button variant="outlined" color="secondary">Download Excel</Button>
                </motion.div> 
                {/* <button>Download Excel</button> */}
                </a> }  
            {/* </Grid>                           */}
            </Grid>
        </Grid>
        </div>
        </motion.div>          
     );
}
 
export default SkillList;