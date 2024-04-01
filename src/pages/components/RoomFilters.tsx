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

// interface FilterOptions {
//     option1: number | null;
//     option2: number | null;
//     startDate: Dayjs | null;
//     endDate: Dayjs | null;
//   }
interface RoomFiltersProps {
    buttonText: string;
    passFilters: (obj:object) => void;
    initialised_values:any;
}



function RoomFilters({buttonText,passFilters,initialised_values}:RoomFiltersProps){
    
    const [selectedOption1, setSelectedOption1] = useState(buttonText==='Search'?"":initialised_values.choice1);
    const [selectedOption2, setSelectedOption2] = useState(buttonText==='Search'?"":initialised_values.choice2);
    const [startDate, setStartDate] = useState<Dayjs | null>(buttonText==='Search'?null:initialised_values.startDate); 
    const [endDate, setEndDate] = useState<Dayjs | null>(buttonText==='Search'?null:initialised_values.endDate);


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

        if(endDate!=null && endDate.isBefore(date)) {
            setEndDate(oneDayAfter);
          }
        // if(date !== null) {
        //     let dateString = date.format('YYYY-MM-DD'); // This will give you the date part in 'YYYY-MM-DD' format 
        //     let timeString = date.format('HH:mm');     // This will give you the time part in 'HH:mm' format 
            
        //     console.log('Date: ', dateString, 'Time: ', timeString);
        // }
    }

    const handleEndDateChange=(date:Dayjs | null)=>{
        setEndDate(date);
        // if(date !== null) {
        //     // let dateString = date.format('YYYY-MM-DD'); // This will give you the date part in 'YYYY-MM-DD' format 
        //     // let timeString = date.format('HH:mm');     // This will give you the time part in 'HH:mm' format 
            
        //     // console.log('Date: ', dateString, 'Time: ', timeString);
        // }
        
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
                        <MenuItem value={'Single'}>Single</MenuItem>
                        <MenuItem value={'Double'}>Double</MenuItem>
                        <MenuItem value={'Both'}>Both</MenuItem>
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
                        <MenuItem value={'AC'}>AC</MenuItem>
                        <MenuItem value={'Non AC'}>Non AC</MenuItem>
                        <MenuItem value={'Both'}>Both</MenuItem>
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
            
    
            
                <Button 
                    variant="contained" 
                    style={{marginBottom: '10px', borderRadius: '50px'}} 
                    // onClick={() => passFilters({
                    //     'option1': selectedOption1,
                    //     'option2': selectedOption2,
                    //     'startDate': startDate, 
                    //     'endDate': endDate
                    // })}
                    onClick={()=>{passFilters({'option1':selectedOption1,'option2':selectedOption2,'startDate':startDate,'endDate':endDate})}}
>

                    {buttonText}
                </Button>

        

    </div>
}    

    
export default RoomFilters;
