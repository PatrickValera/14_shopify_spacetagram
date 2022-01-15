import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from './components/Footer'
import Header from './components/Header'
import Loading from './components/Loading'
// import Main from './screens/Main'
import { Button, Container, Box, Typography, Paper, TextField, Fade, Grow, Collapse, Popover } from '@mui/material';
import { format, addDays, subDays, formatISO9075 } from 'date-fns'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab/';
function App() {
  const date = new Date()
  const [result, setResult] = useState(null)
  const [dateQuery, setDateQuery] = useState(new Date(date + '-05:00'))
  const [loading, setLoading] = useState(true)
  const [imgLoading, setImgLoading] = useState(true)
  const [openCalendar, setOpenCalendar] = useState(false)

  const URL = 'https://api.nasa.gov/planetary/apod?api_key=l7jgCPMiMB7154fyZifWUm5LpKGi4YDiDIt92cgr&date='

  const handleAdd = () => {
    setDateQuery(addDays(dateQuery, 1))
  }
  const handleSub = () => {
    setDateQuery(subDays(dateQuery, 1))
  }

  //POPOVER
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  //POPOVER

  const fetchData = async (abortCtrl) => {
    await axios.get(URL + formatISO9075(dateQuery, { representation: 'date' }), { signal: abortCtrl.signal })
      .then(({ data }) => {
        console.log(data)
        setResult(data)
        setLoading(false)
      }).catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    console.log(dateQuery)
    setLoading(true)
    setImgLoading(true)
    const abortCtrl = new AbortController()
    fetchData(abortCtrl)

    return () => abortCtrl.abort()
  }
    , [dateQuery])

  return (
    <>
      <Header />

      {result ?
        // MAIN STARTS HERE
        <Container component='main' maxWidth='xl' sx={{ pt: { xs: 1, md: 2 }, alignItems: 'center', minHeight: '100vh' }}>
          {/* ========================TITLE AND HEADER======================== */}
          <Fade in={!loading}>
            <Box display='block' sx={{ py: { xs: 1, md: 2 }, textAlign: 'center' }}>
              <Typography variant='h2'>{result.title}</Typography>
            </Box>
          </Fade>
          {/* ========================END TITLE AND HEADER======================== */}


          {/* ========================IMAGE CONTAINER======================== */}
          <Grow in={!imgLoading}>
            <Paper sx={{ display: 'flex', borderRadius: 4, overflow: 'hidden', aspectRatio: '16/9', width: '100%', bgcolor: 'primary.dark', position: 'relative' }}>
              {result.media_type === 'video' ?
                <iframe
                  className='image-fit-cover'
                  src={result.url}
                  frameBorder="0"
                  allowFullScreen
                  title="Embedded youtube"
                  loop
                  control={false}
                  onLoad={() => setImgLoading(false)}
                />
                :
                !loading &&
                <img src={result.hdurl} onLoad={() => setImgLoading(false)} className='image-fit-cover' />
              }
              {/* ========================HEART BUTTON======================== */}
              <Button variant='text' color='primary' sx={{ position: 'absolute', right: 1, bottom: 2, color: '#fafafa' }} >
                <Typography variant='h4' component='span'><i className="far fa-heart"></i></Typography>
              </Button>
              {/* ========================END HEART BUTTON======================== */}
            </Paper>
          </Grow>
          {/* ========================END IMAGE CONTAINER======================== */}


          {/* =====================================ACTION GROUP===================================== */}
          <Paper sx={{ display: 'flex', py: 1, mb: 2, borderRadius: 2, justifyContent: 'right', flexWrap: 'noWrap', bgcolor: 'primary.light' }}>

            {/* ===================PREV-NEXT-DATE BUTTON CONTAINER =================== */}
            <Box display='flex'>
              {/* ========================PREV BUTTON======================== */}
              <Button
                onClick={handleSub}
              >
                <Typography variant='h4' color='#fafafa' component='span'><i className="fas fa-arrow-circle-left"></i></Typography>

              </Button>
              {/* ======================END PREV BUTTON====================== */}

              {/* ========================CALENDAR BUTTON======================== */}
              <Button variant='contained' onClick={handleClick} ><Typography variant='body1'>{format(dateQuery, "LLL-dd-yyyy")} <i className="far fa-calendar-alt" /></Typography></Button>
              {/* ========================END CALENDAR BUTTON======================== */}

              {/* ========================NEXT BUTTON======================== */}
              <Button
                disabled={formatISO9075(date, { representation: 'date' }) === formatISO9075(dateQuery, { representation: 'date' })}
                onClick={handleAdd}
              >
                <Typography variant='h4' component='span' sx={{ color: '#fafafa' }}><i className="fas fa-arrow-circle-right"></i></Typography>
              </Button>
              {/* ======================END NEXT BUTTON======================== */}
            </Box>
            {/* =================== END PREV-NEXT-DATE BUTTON CONTAINER =================== */}
            {/* ======================CALENDAR====================== */}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose} in={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  minDate={new Date(1995, 5, 16)}
                  maxDate={date}
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={dateQuery}
                  onChange={(newValue) => {
                    setDateQuery(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Popover>

            {/* ===================END CALENDAR==================== */}

          </Paper>
          {/* END ACTION GROUP */}

          {/* =====================================BODY===================================== */}
          <Fade in={!loading}>
            <Box component='article' display='block' sx={{ color: 'white', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <Typography variant='body1'>{result.explanation}</Typography>
            </Box>
          </Fade>
          {/* =================================END BODY================================= */}

        </Container>
        // MAIN ENDS HERE 
        :
        // LOADING IF RESULT NOT READY
        <Loading />
        // END LOADING
      }

      <Footer />
    </>
  )
}

export default App;
