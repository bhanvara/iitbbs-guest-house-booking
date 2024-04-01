import React from 'react'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import './HostelSelection.css'

export default function HostelSelection() {
  const [state, setState] = React.useState({
    Guest: true,
    GHR: false,
    BHR: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { Guest, GHR, BHR } = state;
  const error = [Guest, GHR, BHR].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex' }} >
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className='hostel-filter'>
        <FormLabel component="legend">Preferred Residence</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={Guest} onChange={handleChange} name="Guest" />
            }
            label="Guest House"
          />
          <FormControlLabel
            control={
              <Checkbox checked={GHR} onChange={handleChange} name="GHR" />
            }
            label="Ganga Hall of Residence"
          />
          <FormControlLabel
            control={
              <Checkbox checked={BHR} onChange={handleChange} name="BHR" />
            }
            label="Brahmaputra Hall of Residence"
          />
        </FormGroup>
        
      </FormControl>
      
    </Box>
  );
}
