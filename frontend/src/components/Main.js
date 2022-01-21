import { Container } from '@mui/material'
import React from 'react'

const Main = ({ children }) => {
  return (
    <Container
      component='main'
      maxWidth='xl'
      sx={{
        px: { xs: 1, md: 2 },
        pt: { xs: '60px', sm: '50px', md: '40px' },
        alignItems: 'center',
        minHeight: '100vh',
        position: 'static',
      }}
    >
      {children}
    </Container>
  )
}

export default Main
