import React from 'react'
import {Box,Container, Typography} from '@mui/material'
const Footer = () => {
    return (
        <Box component='footer' sx={{bgcolor:'primary.main', textAlign:'center',py:3}}>
            <Container maxWidth='lg' component='header'>
                <Typography variant='body1'>Shopify Assignment Jan '22</Typography>
                <a href='https://github.com/PatrickValera' style={{color:'white'}}><Typography variant='body1'>Patrick Valera</Typography></a>
            </Container>
        </Box>

    )
}

export default Footer
