import React, { useState } from 'react'
import {Box,Button,Container, Typography} from '@mui/material'
const Header = () => {
    const [visible,setVisible]=useState(true)
    return (
        <Box component='header' display={visible?'block':'none'} sx={{bgcolor:'primary.main',position:'absolute',width:'100%',top:'0'}}>
            <Container maxWidth='lg' component='header'>
                <Typography variant='h3'>Spacetagram</Typography>
            <Button variant='contained' onClick={()=>setVisible(state=>!state)}>EYEfefefe ICON</Button>

            </Container>
        </Box>

    )
}

export default Header
