import React, { useState } from 'react'
import {Box,Button,Container, Typography} from '@mui/material'
const Header = () => {
    const [visible,setVisible]=useState(true)
    return (
        <Box component='header' display={visible?'block':'none'} sx={{py:{xs:1,md:2},bgcolor:'primary.main',width:'100%'}}>
            <Container maxWidth='xl' sx={{display:'block'}}>
            
                <Typography variant='h2'><i className="fas fa-moon"></i> Spacetagram</Typography>
                <Typography variant='body2' color='grey.400' sx={{ml:{xs:'2rem',md:'3rem'},fontSize:{xs:'.45rem',md:'.7rem'}}}> NASA's photo of the day</Typography>

            </Container>
        </Box>

    )
}

export default Header
