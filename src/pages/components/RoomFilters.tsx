import React, { useState } from 'react';
import { MenuItem, FormControl, Select, TextField, InputLabel, SelectChangeEvent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import './RoomFilters.css'




function RoomFilters(){
    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);


    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;

        if(name === "selectedOption1") {
            setSelectedOption1(value);
        } else if(name === "selectedOption2") {
            setSelectedOption2(value);
        }
    };

    const handleStartDateChange=(date:Dayjs | null)=>{
        setStartDate(date);
        const oneDayAfter = dayjs(date).add(1, 'day');

        setEndDate(oneDayAfter);
        if(date !== null) {
            let dateString = date.format('YYYY-MM-DD'); // This will give you the date part in 'YYYY-MM-DD' format 
            let timeString = date.format('HH:mm');     // This will give you the time part in 'HH:mm' format 
            
            console.log('Date: ', dateString, 'Time: ', timeString);
        }
    }

    const handleEndDateChange=(date:Dayjs | null)=>{
        setEndDate(date);
        if(date !== null) {
            let dateString = date.format('YYYY-MM-DD'); // This will give you the date part in 'YYYY-MM-DD' format 
            let timeString = date.format('HH:mm');     // This will give you the time part in 'HH:mm' format 
            
            console.log('Date: ', dateString, 'Time: ', timeString);
        }
        
    }



    
    
    return <div className='filter-band'>
        
                <FormControl sx={{ minWidth: 120, width: 220, marginRight: '10px', marginBottom: '10px'}}>
                    <InputLabel id="demo-simple-select-helper-label">Single / Double</InputLabel>
                    <Select 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="selectedOption1" 
                        label="Single/Double"
                        value={selectedOption1} 
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={1}>Single</MenuItem>
                        <MenuItem value={2}>Double</MenuItem>
                        <MenuItem value={3}>Both</MenuItem>
                    </Select>
                </FormControl>
            
    
            
                <FormControl sx={{ minWidth: 120, width: 220, marginRight: '10px', marginBottom: '10px'}}>
                    <InputLabel id="demo-simple-select-helper-label">AC / Non AC</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="selectedOption2"
                        label="AC / Non-AC"
                        value={selectedOption2}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={4}>AC</MenuItem>
                        <MenuItem value={5}>Non AC</MenuItem>
                        <MenuItem value={6}>Both</MenuItem>
                    </Select>
                </FormControl>
            
    
            
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <InputLabel shrink htmlFor="start-date">
                    Start Date
                    </InputLabel> */}
                    <DateTimePicker
                        desktopModeMediaQuery="(min-width:600px)" 
                        label={'Check-in'} 
                        views={['year', 'month', 'day','hours','minutes']} 
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="my-datetimepicker"
                    />
                </LocalizationProvider>
            
    
            
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <InputLabel shrink htmlFor="end-date">
                    End Date
                    </InputLabel> */}
                    <DateTimePicker 
                        desktopModeMediaQuery="(min-width:600px)" 
                        label={'Check-out'} 
                        views={['year', 'month', 'day','hours','minutes']} 
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="my-datetimepicker"
                    />
                </LocalizationProvider>
            
    
            
                <Button variant="contained" color="primary" style={{marginBottom: '10px'}}>
                    Apply Filters
                </Button>

        

    </div>
}    

    
export default RoomFilters;
