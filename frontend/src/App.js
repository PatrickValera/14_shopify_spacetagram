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
  const [imageLiked, setImageLiked] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)

  const URL = 'https://api.nasa.gov/planetary/apod?api_key=l7jgCPMiMB7154fyZifWUm5LpKGi4YDiDIt92cgr&date='

  const handleAdd = () => {
    setDateQuery(addDays(dateQuery, 1))
  }
  const handleSub = () => {
    setDateQuery(subDays(dateQuery, 1))

  }
  const handleLike = () => {
    setImageLiked(state => !state)
    const localStrg = JSON.parse(localStorage.getItem('likedImgs')) || {}
    const imgDate = String(formatISO9075(dateQuery, { representation: 'date' }))
    localStrg[imgDate] = imageLiked ? false : true
    localStorage.setItem('likedImgs', JSON.stringify({ ...localStrg }))
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

  useEffect(() => {
    let obj = JSON.parse(localStorage.getItem('likedImgs')) || {}
    const imgDate = String(formatISO9075(dateQuery, { representation: 'date' }))
    console.log(obj)
    if (obj[imgDate]) setImageLiked(true)
    else setImageLiked(false)
  }, [dateQuery])
  return (
    <>
      <Header />

      {result ?
        // MAIN STARTS HERE
        <Container component='main' maxWidth='xl' sx={{ pt: { xs: 1, md: 2 }, alignItems: 'center', minHeight: '100vh', position: 'static' }}>
          {/* ==========TITLE AND HEADER======================== */}
          <Fade in={!loading}>
            <Box display='block' sx={{ py: { xs: 1, mb: 2 }, textAlign: 'center', height: { xs: '30px', md: '50px' } }}>
              <Typography variant={result.title.length > 30 ? 'h3' : 'h2'}>{result.title}</Typography>
            </Box>
          </Fade>
          {/* ==========END TITLE AND HEADER======================== */}

          {/* ==========PLAYER CONTAINER==================================== */}
          <Paper className={fullScreen&&'player'} sx={{transitionDuration:'1s',borderRadius: 2, overflow: 'hidden', mb: 1}}>
            {/* =============IMAGE CONTAINER======================== */}
            <Fade in={!imgLoading}>
              <Paper sx={{ display: 'flex', width:'100%',aspectRatio:'16/9',flexGrow:'1',borderRadius:'0',  position: 'relative',bgcolor: 'primary.dark' }}>
                {result.media_type === 'video' ?
                  <iframe
                    className='image-fit-cover'
                    src={result.url}
                    className='image-fit-contain'
                    frameBorder="0"
                    allowFullScreen
                    title="Embedded youtube"
                    loop
                    onLoad={() => setImgLoading(false)}
                  />
                  :
                  !loading &&
                  <img src={result.url} onLoad={() => setImgLoading(false)} className='image-fit-cover' />
                }
                {/* ===================HEART BUTTON======================== */}
                <Button variant='text' color='primary' onClick={handleLike} sx={{ position: 'absolute', right: 1, bottom: 2, color: '#fafafa' }} >
                  {imageLiked ? 'LIKED' : <Typography variant='h4' component='span'><i className="far fa-heart"></i></Typography>}
                </Button>
                {/* ===================END HEART BUTTON======================== */}

              </Paper>
            </Fade>
            {/* =============END IMAGE CONTAINER======================== */}

            {/* =============ACTION GROUP===================================== */}
            <Paper sx={{ display: 'flex', py: 0, justifyContent: 'space-between', bgcolor: 'red',borderRadius:'0',  flexWrap: 'noWrap', bgcolor: 'primary.light' }}>
              {/* ===================PREV-NEXT-DATE BUTTON CONTAINER =================== */}
              <Button>
                <Typography variant='h4' color='#fafafa' component='span' onClick={()=>setFullScreen(state=>!state)}><i className="fas fa-expand-alt" /></Typography>
              </Button>
              <Box display='flex'>
                {/* ========================PREV BUTTON======================== */}
                <Button
                  onClick={handleSub}
                  sx={{minWidth:'35px'}}
                >
                  <Typography variant='h4' color='#fafafa' component='span'><i className="fas fa-arrow-circle-left"></i></Typography>

                </Button>
                {/* ======================END PREV BUTTON====================== */}

                {/* ========================CALENDAR BUTTON======================== */}
                <Button variant='contained' onClick={handleClick} sx={{ px: 1, py: '0', minWidth: { xs: '80px', md: '140px' } }}><Typography variant='body1'>{format(dateQuery, "LLL-dd-yyyy")} <i className="far fa-calendar-alt" /></Typography></Button>
                {/* ========================END CALENDAR BUTTON======================== */}

                {/* ========================NEXT BUTTON======================== */}
                <Button
                  disabled={formatISO9075(date, { representation: 'date' }) === formatISO9075(dateQuery, { representation: 'date' })}
                  onClick={handleAdd}
                  sx={{minWidth:'35px'}}
                >
                  <Typography variant='h4' component='span' sx={{ color: '#fafafa' }}><i className="fas fa-arrow-circle-right"></i></Typography>
                </Button>
                {/* ======================END NEXT BUTTON======================== */}
              </Box>
              {/* ===================END PREV-NEXT-DATE BUTTON CONTAINER =================== */}

              {/* ===================CALENDAR====================== */}
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
            {/* =============END ACTION GROUP=================================== */}


          </Paper>
          {/* ====================================END PLAYER CONTAINER==================================== */}

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
