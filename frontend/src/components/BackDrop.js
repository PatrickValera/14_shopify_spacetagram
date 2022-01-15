import { Typography, Backdrop as MuiBD, Box } from '@mui/material'
import React from 'react'

export const BackDrop = ({ openInfo, setOpenInfo, explanation, title }) => {

    return (
        <>
            <MuiBD
                sx={{ color: '#fbfbfb', zIndex: '10000000',bgcolor:'rgba(0,0,0,.85)' }}
                open={openInfo}
                onClick={()=>setOpenInfo(false)}
            >
                <Box sx={{textAlign:'center' ,margin:'0 auto', maxWidth:{xs:'290px',sm:'320px',md:'500px'}}}>
                    <Typography variant='h3' sx={{mb:1}}>{title||"NONE"}</Typography>
                    <Typography variant='body2'>{explanation||"NONE"}</Typography>
                </Box>
            </MuiBD>
        </>
    )
}
