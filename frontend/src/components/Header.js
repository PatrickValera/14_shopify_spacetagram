import React, { useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(true)
    const [currentPage, setCurrentPage] = useState(window.location.pathname)
    return (
        <Box component='header' display={visible ? 'block' : 'none'} sx={{ py: { xs: 1, md: 2 }, bgcolor: 'primary.main', width: '100%' }}>
            <Container maxWidth='xl' sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: '1' }}>
                    <Button variant='text' onClick={() => navigate('/')} sx={{ py: '0' }}><Typography variant='h2' color='white'><i className="fas fa-moon"></i> Spacetagram</Typography></Button>
                    <Typography variant='body2' color='grey.400' sx={{ ml: { xs: '2rem', md: '3rem' }, fontSize: { xs: '.45rem', md: '.7rem' } }}> NASA's photo of the day</Typography>
                </Box>
                <Box>
                    {currentPage === '/' ?
                        <Button variant='contained' onClick={() => {
                            navigate('/gallery')
                            setCurrentPage('gallery')
                        }}><Typography variant='h4' ><i className="fas fa-th"></i></Typography></Button>
                        :
                        <Button variant='contained' onClick={() => {
                            navigate('/')
                            setCurrentPage('/')
                        }}><Typography variant='h4' ><i className="fas fa-image"/></Typography></Button>
                    }

                </Box>
            </Container>
        </Box>

    )
}

export default Header
