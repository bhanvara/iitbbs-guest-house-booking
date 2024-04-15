import React from 'react'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function HostelSelection() {
  //state stores which all checkboxes are checked
  const [state, setState] = React.useState({
    Guest: true,
    GHR: false,
    BHR: false,
    SHR: false,
    RHR: false,
    MHR: false,
  });





  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { Guest, GHR, BHR, SHR, RHR, MHR} = state;
  const error = [Guest, GHR, BHR, SHR, RHR, MHR].filter((v) => v).length !== 2;

  return (
    <Box sx={{xs:'100%'}} className='font-inter lg:mx-auto mx-2 rounded-xl p-3 mt-8 bg-white' >
      <h2 className='pl-4 pt-5 font-medium'>Filters</h2>
      <hr />
      <FormControl sx={{ m: 1 }} component="fieldset" variant="standard" className='font-inter text-black text-xs'>
        <FormLabel component="legend" className='font-inter text-sm text-black'>Preferred Residence</FormLabel>
        <FormGroup className='font-inter text-black text-xs'>
          <FormControlLabel
            control={
              <Checkbox checked={Guest} onChange={handleChange} name="Guest" />
            }
            label="Guest House"
            className='text-xs'
          />
          <FormControlLabel
            control={
              <Checkbox checked={MHR} onChange={handleChange} name="MHR" />
            }
            label="Mahanadi Hall of Residence"
          />
          <FormControlLabel
            control={
              <Checkbox checked={GHR} onChange={handleChange} name="GHR" />
            }
            label="Ganga Hall of Residence"
          />
          <FormControlLabel
            control={
              <Checkbox checked={SHR} onChange={handleChange} name="SHR" />
            }
            label="Subarnarekha Hall of Residence"
          />
          <FormControlLabel
            control={
              <Checkbox checked={BHR} onChange={handleChange} name="BHR" />
            }
            label="Brahmaputra Hall of Residence"
          />
          <FormControlLabel
            control={
              <Checkbox checked={RHR} onChange={handleChange} name="RHR" />
            }
            label="Rishikulya Hall of Residence"
          />
        </FormGroup>
        
      </FormControl>
      {/* <FormDialog /> */}
      
    </Box>
  );
}
