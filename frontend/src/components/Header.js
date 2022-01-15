import React, { useState } from 'react'
import {Box,Button,Container, Typography} from '@mui/material'
const Header = () => {
    const [visible,setVisible]=useState(true)
    return (
        <Box component='header' display={visible?'block':'none'} sx={{py:{xs:1,md:4},bgcolor:'primary.main',width:'100%',top:'0'}}>
            <Container maxWidth='xl' sx={{display:'flex'}}>
            
                <Typography variant='h3' sx={{flexGrow:'1'}}><i className="fas fa-moon"></i> Spacetagram</Typography>

            </Container>
        </Box>

    )
}

export default Header
