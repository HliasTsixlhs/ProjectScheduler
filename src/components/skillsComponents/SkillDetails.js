import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";
import { motion } from 'framer-motion';

//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider } from '@material-ui/core';

const SkillDetails = () => {

    const { id } = useParams();
    const { data:skill, error, isPending } = useFetch('http://localhost:8000/skills/' + id);
    const history = useHistory();

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

    const handleOnClick = () => {
        fetch('http://localhost:8000/skills/' + skill._id, {
            method: 'DELETE'
        }).then( () => {
            //history.push('/');
            history.goBack();
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"> 
        <Grid container justify='center' style={{textAlign:'center'}}>
        <div className="skill-details">
            { isPending && <div>Loading...</div> }
            { error && <div> { error } </div> }
            { skill && !error && (

                <article>
                <Typography variant="h3" component="h2" color="secondary">
                        Skill's Details
                </Typography>
                    {/* <h2>{skill.name}</h2>
                    <h3>Skill's description:</h3>
                    <p>{skill.description} </p>
                    <h3>Skill's creation day:</h3>
                    <p>{skill.createdAt} </p> */}
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2" color="textSecondary">
                                Skill's Name:
                            </Typography>
                            <Typography variant="h5" component="h2" color="textPrimary">
                                { skill.name }
                            </Typography>
                            <Divider />
                            <Typography variant="h6" component="h2" color="textSecondary">
                                Skill's description:
                            </Typography>
                            <Typography variant="h6" component="h2" color="textPrimary">
                                { skill.description }
                            </Typography>
                            <Typography variant="h6" component="h2" color="textSecondary">
                                Skill's creation day:
                            </Typography>
                            <Typography variant="h6" component="h2" color="textPrimary">
                            { skill.createdAt }
                            </Typography>                                                        
                        </CardContent>
                    </Card>                                                                                
                    {/* <button onClick={handleOnClick}>Delete</button> */}
                    <motion.div
                    variants={buttonVariants}
                    whileHover="hover">                     
                        <Button onClick={handleOnClick} variant="outlined" color="secondary">Delete</Button>
                    </motion.div>                     
                    <Link to={`/skills/${skill._id}/update`}>
                        {/* <button>Update</button> */}
                        <motion.div
                        variants={buttonVariants}
                        whileHover="hover">                         
                            <Button variant="outlined" color="secondary">Update</Button>
                        </motion.div>                         
                    </Link>
                </article>
            )}
        </div> 
        </Grid>
        </motion.div>
     );
}
 
export default SkillDetails;