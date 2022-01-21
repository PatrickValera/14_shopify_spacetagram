import { Box, Button, Paper, Typography } from '@mui/material'
import { format, formatISO9075 } from 'date-fns'
import React from 'react'
import Loading from './Loading'

const PlayerControl = ({
  fullScreen,
  setFullScreen,
  setFitImage,
  setOpenInfo,
  error,
  imgLoading,
  handleSub,
  handleAdd,
  handleOpenCalendar,
  setOpenMobileCal,
  date,
  dateQuery,
}) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        py: 1,
        pb: `${fullScreen ? '15px' : '10px'}`,
        position: 'relative',
        justifyContent: 'space-between',
        bgcolor: 'red',
        borderRadius: '0',
        flexWrap: 'noWrap',
        bgcolor: 'primary.light',
      }}
    >
      {/* ===================EXPANDS BUTTON CONTAINER =================== */}
      <Box display='flex' sx={{ gap: 1 }}>
        <Button
          sx={{ minWidth: '30px', px: 0, ml: 1 }}
          onClick={() => {
            setFullScreen((state) => !state)
          }}
        >
          <Typography variant='h4' color='#fafafa' component='span'>
            {fullScreen ? (
              <i className='fas fa-compress-alt'></i>
            ) : (
              <i className='fas fa-expand-alt' />
            )}
          </Typography>
        </Button>
        <Button
          sx={{ minWidth: '30px', px: 0 }}
          onClick={() => setFitImage((state) => !state)}
        >
          <Typography variant='h4' color='#fafafa' component='span'>
            <i className='fas fa-compress'></i>
          </Typography>
        </Button>
        <Button
          sx={{ minWidth: '30px', px: 0 }}
          onClick={() => setOpenInfo((state) => !state)}
        >
          <Typography variant='h4' color='#fafafa' component='span'>
            <i className='fas fa-align-center' />
          </Typography>
        </Button>
      </Box>
      {/* ===================END EXPANDS BUTTON CONTAINER =================== */}
      {error && (
        <Typography
          variant='body2'
          color='#994444'
          sx={{ position: 'absolute', right: '10px', top: '-25px' }}
        >
          {error}
        </Typography>
      )}

      {/* ===================PREV-NEXT-DATE BUTTON CONTAINER =================== */}
      <Box display='flex' sx={{ alignItems: 'center' }}>
        {imgLoading && <Loading />}
        {/* ========================PREV BUTTON======================== */}
        <Button
          onClick={handleSub}
          sx={{ minWidth: { xs: '5px', md: '35px' } }}
        >
          <Typography variant='h4' color='#fafafa' component='span'>
            <i className='fas fa-arrow-circle-left'></i>
          </Typography>
        </Button>
        {/* ======================END PREV BUTTON====================== */}

        {/* ========================CALENDAR BUTTON======================== */}
        <Button
          variant='contained'
          onClick={handleOpenCalendar}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            px: 1,
            py: 1,
            minWidth: { xs: '90px', md: '140px' },
          }}
        >
          <Typography variant='body1'>
            {format(dateQuery, 'LLL-dd-yyyy')}{' '}
            <i className='far fa-calendar-alt' />
          </Typography>
        </Button>
        {/* MOBILE CALENDAR BUTTON */}
        <Button
          variant='contained'
          onClick={() => setOpenMobileCal(true)}
          sx={{
            display: { xs: 'flex', sm: 'none' },
            mx: '5px',
            py: '0',
            px: '7px',
            minWidth: { xs: '65px', md: '140px' },
          }}
        >
          <Typography variant='body2' sx={{ fontSize: '10px !important' }}>
            {format(dateQuery, 'LLL-dd-yy')} <br />
            <i className='far fa-calendar-alt' />
          </Typography>
        </Button>

        {/* ========================END CALENDAR BUTTON======================== */}

        {/* ========================NEXT BUTTON======================== */}
        <Button
          disabled={
            formatISO9075(date, { representation: 'date' }) ===
            formatISO9075(dateQuery, { representation: 'date' })
          }
          onClick={handleAdd}
          sx={{ minWidth: { xs: '5px', md: '35px' } }}
        >
          <Typography
            variant='h4'
            component='span'
            sx={{
              mr: 2,
              color: `${
                formatISO9075(date, { representation: 'date' }) ===
                formatISO9075(dateQuery, { representation: 'date' })
                  ? 'grey'
                  : '#fafafa'
              }`,
            }}
          >
            <i className='fas fa-arrow-circle-right' />
          </Typography>
        </Button>
        {/* ======================END NEXT BUTTON======================== */}
      </Box>
      {/* ===================END PREV-NEXT-DATE BUTTON CONTAINER =================== */}
    </Paper>
  )
}

export default PlayerControl
