import React from 'react'
import {Box,Container, Typography} from '@mui/material'
const Footer = () => {
    return (
        <Box component='footer' sx={{bgcolor:'primary.main'}}>
            <Container maxWidth='lg' component='header'>
                <Typography variant='body1'>Footer</Typography>
            </Container>
        </Box>

    )
}

export default Footer
