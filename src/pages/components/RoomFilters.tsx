import React, { useState } from 'react';
import { MenuItem, FormControl, Select, TextField, InputLabel, SelectChangeEvent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers';

import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';




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
        
    }

    const handleEndDateChange=(date:Dayjs | null)=>{
        setEndDate(date);
        
        
    }

    

   




    
    
    return <div className='flex flex-col items-center justify-center md:flex-row p-2 bg-white'>
                <div className='flex flex-col md:flex-row'>
                    <div className='flex-row items-center justify-between mb-3 md:mb-0'>
                        <FormControl  sx={{ minWidth: 100, width: {xs:150, lg:220}, marginRight: {xs: '2px', sm: '10px'}}}>
                            <InputLabel id="demo-simple-select-helper-label">Single / Double</InputLabel>
                            <Select 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="selectedOption1" 
                                label="Single/Double"
                                value={selectedOption1} 
                                onChange={handleSelectChange}
                                sx={{backgroundColor: 'rgb(244,245,245)'}}
                            >
                                <MenuItem value={'Single'}>Single</MenuItem>
                                <MenuItem value={'Double'}>Double</MenuItem>
                                <MenuItem value={'Both'}>Both</MenuItem>
                            </Select>
                        </FormControl>
                    
            
                    
                        <FormControl  sx={{ minWidth: 100, width: {xs:150, lg:220}, marginRight: {xs: '2px', sm: '10px'}}}>
                            <InputLabel id="demo-simple-select-helper-label">AC / Non AC</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="selectedOption2"
                                label="AC / Non-AC"
                                value={selectedOption2}
                                onChange={handleSelectChange}
                                sx={{backgroundColor: 'rgb(244,245,245)'}}
                            >
                                <MenuItem value={'AC'}>AC</MenuItem>
                                <MenuItem value={'Non AC'}>Non AC</MenuItem>
                                <MenuItem value={'Both'}>Both</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='flex-row justify-between items-center mb-2 md:mb-0'>
                
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* <InputLabel shrink htmlFor="start-date">
                            Start Date
                            </InputLabel> */}
                            <DateTimePicker
                                sx={{ minWidth: 100, width: {xs:150, lg:220}, marginRight: {xs: '2px', sm: '10px'}, backgroundColor: 'rgb(244,245,245)'}}
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
                                sx={{ minWidth: 100,width: {xs:150, lg:220}, marginRight: {xs: '2px', sm: '10px'}, backgroundColor: 'rgb(244,245,245)'}}
                                label={'Check-out'} 
                                views={['year', 'month', 'day','hours','minutes']} 
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="my-datetimepicker"
                            />
                        </LocalizationProvider>
                    </div>
                </div>
            
                
                <div className='flex justify-center items-center w-3/4 md:w-36'>
                    <button className='bg-custom-blue rounded-lg text-white w-96 shadow-md hover:shadow-lg hover:bg-dark-custom-blue'
                        
                        
                        style={{height:'3.5rem'}}
                        onClick={()=>{passFilters({'option1':selectedOption1,'option2':selectedOption2,'startDate':startDate,'endDate':endDate})}}
                    >

                        {buttonText}
                    </button>

                </div>

        </div>
}    

    
export default RoomFilters;
