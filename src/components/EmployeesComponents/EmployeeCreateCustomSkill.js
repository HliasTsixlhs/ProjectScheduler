import { useState } from "react";

//Imports from Materia UI 
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const EmployeeCreateNewCustomSkill = ({customSkill, num, parrentCallback}) => {

    const [name, setName] = useState(customSkill.name);
    const [description, setDescription] = useState(customSkill.description);


    return (
            <Grid container spacing={3}>
                    {/* <label>Skill's Name:</label>

                    <input type="text" required value={name} onChange={(e) => {
                        setName(e.target.value)
                        parrentCallback(name, description, num)
                        }} /> */}
                    <Grid item xs={12} lg={6}>    
                    <TextField fullWidth required id="standard-required" label="Skill's Name:" 
                    value={ name } onChange={(e) => {
                        setName(e.target.value)
                        parrentCallback(name, description, num)
                        }}/> 
                    </Grid>                                                                   
                    {/* <label>Skill's Description:</label> */}
                    {/* <textarea required value={description} onChange={(e) => {
                        setDescription(e.target.value)
                        parrentCallback(name, description, num)
                        }}></textarea> */}
                    <Grid item xs={12} lg={6}>                          
                    <TextField fullWidth id="standard-required" label="Skill's Description:"
                    required value={description} onChange={(e) => {
                        setDescription(e.target.value)
                        parrentCallback(name, description, num)
                        }} />         
                    </Grid>                                                

        </Grid>
      );
}
 

export default EmployeeCreateNewCustomSkill;