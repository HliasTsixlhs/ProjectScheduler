import { motion } from 'framer-motion'
import { useState } from 'react'

//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import PeopleIcon from '@material-ui/icons/People';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

const { Link } = require("react-router-dom")

const Navbar = () => {

    const svgVariants = {
        hidden: { rotate: -180 },
        visible: {
            rotate: 0,
            transition: { duration: 3 }
        },
    };

    const pathVariants0 = {
        hidden: {
            opacity: 0,
            pathLength: 0,
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 4,
                ease: "easeInOut",
            }
        }
    };

    const pathVariants1 = {
        hidden: {
            opacity: 0,
            pathLength: 0,
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 3,
                ease: "easeInOut",
            }
        }
    };
    
    const pathVariants2 = {
        hidden: {
            opacity: 0,
            pathLength: 0,
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
            }
        }
    };
    
    const IndeavorsVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 3,
                ease: "easeInOut",
            }
        }
    };     

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
            <Paper variant='outlined'>
                <Grid container style={{backgroundColor: "WhiteSmoke", height:'140px'}}>
                <Grid item xs={12} style={{textAlign:'center'}}>
                    <Link to="/">
                    
                        <motion.svg 
                            variants={svgVariants}
                            initial="hidden"
                            animate="visible"
                            className="pizza-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">



                            <motion.path
                                variants={pathVariants0}                         
                                fill="none"
                                d="M0,40 l-40,40 l40,40 l10,-10 M0,40 l40,40 l-10,10" 
                            />
                            <motion.path
                                variants={pathVariants1}                               
                                fill="none"
                                // d="M0,20 l-60,60 l60,60 l15,-15 M0,20 l60,60 l-15,15" 
                                d="M0,20 l15,15 M0,20 l-60,60 l60,60 l60,-60 l-15,-15 "
                            /> 
                            <motion.path
                                variants={pathVariants2}                               
                                fill="none"
                                // d="M0,0 l-80,80 l80,80 l20,-20 M0,0 l80,80 l-20,20" 
                                d="M0,0 l-20,20 M0,0 l80,80 l-80,80 l-80,-80 l20,-20" 
                            />  
                            {/* OUTER */}
                            {/* {/* <motion.circle variants={pathVariants} cx="60" cy="100" r="5" stroke="black" stroke-width="3" fill="blue" />
                            <motion.circle variants={pathVariants} cx="20" cy="140" r="5" stroke="black" stroke-width="3" fill="blue" /> */}
                            <motion.circle variants={pathVariants2} cx="-60" cy="60" r="4" stroke="black" stroke-width="1" fill="blue" />
                            <motion.circle variants={pathVariants2} cx="-20" cy="20" r="4" stroke="black" stroke-width="1" fill="blue" /> 
                            {/* MIDDLE */}
                            {/* <motion.circle variants={pathVariants} cx="15" cy="125 " r="5" stroke="black" stroke-width="3" fill="blue" />
                            <motion.circle variants={pathVariants} cx="45" cy="95" r="5" stroke="black" stroke-width="3" fill="blue" />  */}
                            <motion.circle variants={pathVariants2} cx="15" cy="35 " r="4" stroke="black" stroke-width="1" fill="blue" /> 
                            <motion.circle variants={pathVariants2} cx="45" cy="65" r="4" stroke="black" stroke-width="1" fill="blue" />                              
                            {/* INNER */}
                            <motion.circle variants={pathVariants2} cx="10" cy="110" r="4" stroke="black" stroke-width="1" fill="blue" /> 
                            <motion.circle variants={pathVariants2} cx="30" cy="90" r="4" stroke="black" stroke-width="1" fill="blue" />                                                                                  
                            
                            {/* <text x="120" y="80" fontSize='24px'> INDEAVOR's Scheduler Challenge!</text> */}
                        </motion.svg>
                        
                        <Hidden mdDown>
                        <motion.svg 
                            
                            className="pizza-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                            <motion.text 
                                variants={IndeavorsVariants}
                                initial="hidden"
                                animate="visible"                                
                                x="0" y="80" fontSize='35px'> INDEAVOR's Scheduler Challenge!</motion.text>
                        </motion.svg>
                        </Hidden>
                    </Link>
                </Grid>
                    
              
                </Grid>
                <Divider />
                <Grid container alignItems="center" justify='center' style={{backgroundColor: "#F0F8FF"}}>
                    <Grid item xs={10} md={5} style={{textAlign:'center'}}>
                    <Link to="/">
                                                    
                                <Typography variant={"h3"} component={"h3"} color="primary">Scheduler!</Typography>
                            
                    </Link>
                    </Grid>



                  
                    {/* <Grid item xs={6} style={{ textAlign: "center" }}>
                        <Link to="/">

                            <Typography variant={"h3"} component={"h3"} color="primary">Scheduler!</Typography>
                        </Link>
                    </Grid> */}

                    <Hidden smDown>
                    <Grid spacing={3} xs={12} md={7} item container justify="flex-end" >                         
                        {/* <div className="links"> */}
                        <Grid item >
                            <Button variant='outlined' color="primary" startIcon={<HomeIcon/>}><Link to="/">Home</Link></Button>
                        </Grid>
                        <Grid item >    
                            <Button variant="outlined" color="primary" startIcon={<SchoolIcon/>}><Link to="/skills">Skills</Link></Button>                
                        </Grid>
                        <Grid item >
                            <Button variant="outlined" color="primary" startIcon={<PeopleIcon/>}><Link to ="/employees">Employees</Link></Button>
                        </Grid>
                        {/* </div> */}
                    </Grid>
                    </Hidden>

                    <Grid item  xs={2} style={{textAlign:'right'}} >
                    <Hidden mdUp>
                    <IconButton color={'secondary'} edge="right"  aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><Button variant='outlined' color="secondary" startIcon={<HomeIcon/>}><Link to="/">Home</Link></Button></MenuItem>
                        <MenuItem onClick={handleClose}><Button variant="outlined" color="secondary" startIcon={<SchoolIcon/>}><Link to="/skills">Skills</Link></Button></MenuItem>
                        <MenuItem onClick={handleClose}><Button variant="outlined" color="secondary" startIcon={<PeopleIcon/>}><Link to ="/employees">Employees</Link></Button></MenuItem>
                    </Menu>
                    </Hidden>
                    </Grid>

                </Grid>
            </Paper>                 
      );
}
 
export default Navbar;