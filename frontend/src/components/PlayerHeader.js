import { Box, Fade, Typography } from '@mui/material'
import React from 'react'

const PlayerHeader = ({ loading, title }) => {
  return (
    <Fade in={!loading}>
      <Box
        display='block'
        sx={{ textAlign: 'center', height: { xs: '30px', md: '50px' } }}
      >
        <Typography variant={title.length > 30 ? 'h5' : 'h2'}>
          {title}
        </Typography>
      </Box>
    </Fade>
  )
}

export default PlayerHeader
