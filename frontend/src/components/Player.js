import { Paper } from '@mui/material'
import React from 'react'

const Player = ({ fullScreen, children }) => {
  return (
    <Paper
      className={`player ${fullScreen && 'player-fullscreen'}`}
      sx={{
        transitionDuration: '1s',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 1,
        bgcolor: 'primary.dark',
        zIndex: '100000',
      }}
    >
      {children}
    </Paper>
  )
}

export default Player
