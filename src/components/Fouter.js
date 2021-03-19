//Imports from Materia UI 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';


const Fouter = () => {
    return (
            <Paper variant='outlined'>
                <Grid container justify="space-around" alignItems="center" style={{backgroundColor: "#F0F8FF"}}>
                    <Grid  item style={{ textAlign: "center" }}>
                            <Typography variant={"body1"} component={"p"} color="primary">Copyright © 2021 | Indeavor - All Rights Reserved</Typography>
                    </Grid>
                    <Grid item style={{ textAlign: "center" }} >                         
                        <Typography variant={"body1"} component={"p"} color="primary">Developed and Designed by: <a target='_blank' rel="noreferrer" href="https://www.linkedin.com/in/hlias-tsichlis-a1a3211b3/"> © Tsiclis Hlias </a></Typography>
                    </Grid>
                </Grid>
            </Paper>                 
      );
}
 
export default Fouter;