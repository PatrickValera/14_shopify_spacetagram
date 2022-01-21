import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import React from 'react'

const Calendar = ({date,dateQuery,setDateQuery,setOpenMobileCal}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
            minDate={new Date(1995, 5, 16)}
            maxDate={date}
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={dateQuery}
            onChange={(newValue) => {
                setDateQuery(newValue);
                if(setOpenMobileCal)setOpenMobileCal(false);
                
            }}

            renderInput={(params) => <TextField {...params} />}
        />

    </LocalizationProvider>
    )
}

export default Calendar
