import { useEffect, useState } from 'react'
import axios from 'axios'

import Loading from '../components/Loading'
// import Main from './screens/Main'
import { Button, Container, Box, Typography, Paper, TextField, Fade, Grow, Collapse, Popover, Backdrop, OutlinedInput } from '@mui/material';
import { format, addDays, subDays, formatISO9075 } from 'date-fns'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker, MobileDatePicker } from '@mui/lab/';
import { BackDrop } from '../components/BackDrop';
function Home() {
  const date = new Date()
  const [result, setResult] = useState(null)
  const [dateQuery, setDateQuery] = useState(new Date('2022','00','15'))
  const [loading, setLoading] = useState(true)
  const [imgLoading, setImgLoading] = useState(true)
  const [imageLiked, setImageLiked] = useState(false)
  const [fitImage, setFitImage] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)

  const URL = 'https://api.nasa.gov/planetary/apod?api_key=l7jgCPMiMB7154fyZifWUm5LpKGi4YDiDIt92cgr&date='

  const handleAdd = () => {
    setDateQuery(addDays(dateQuery, 1))
  }
  const handleSub = () => {
    setDateQuery(subDays(dateQuery, 1))

  }
  const handleLike = (imgUrl,type) => {
    setImageLiked(state => !state)
    const localStrg = JSON.parse(localStorage.getItem('likedImagesSG')) || {}
    const imgDate = String(formatISO9075(dateQuery, { representation: 'date' }))
    localStrg[imgDate] = {
        date:imgDate,
        liked:imageLiked ? false : true,
        url:imgUrl,
        type:type
    }
    localStorage.setItem('likedImagesSG', JSON.stringify({ ...localStrg }))
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
        // console.log(data)
        setResult(data)
        setLoading(false)
      }).catch((e) => {
        // console.log(e)
      })
  }

  useEffect(() => {
    // console.log(dateQuery)
    setLoading(true)
    setImgLoading(true)
    const abortCtrl = new AbortController()
    fetchData(abortCtrl)

    return () => abortCtrl.abort()
  }
    , [dateQuery])

  useEffect(() => {
    let obj = JSON.parse(localStorage.getItem('likedImagesSG')) || {}
    const imgDate = String(formatISO9075(dateQuery, { representation: 'date' }))
    // console.log(obj)
    if (obj[imgDate]) setImageLiked(true)
    else setImageLiked(false)
  }, [dateQuery])
  return (
    <>
      {/* // MAIN STARTS HERE */}
      <Container component='main' maxWidth='xl' sx={{ px: { xs: 1, md: 2 }, pt: { xs: '60px', sm: '50px', md: '40px' }, alignItems: 'center', minHeight: '100vh', position: 'static' }}>
        {result &&
          <>
            <BackDrop openInfo={openInfo} setOpenInfo={setOpenInfo} title={result.title} explanation={result.explanation} />
            {/* ==========TITLE AND HEADER======================== */}
            <Fade in={!loading}>
              <Box display='block' sx={{ textAlign: 'center', height: { xs: '30px', md: '50px' } }}>
                <Typography variant={result.title.length > 30 ? 'h5' : 'h2'}>{result.title}</Typography>
              </Box>
            </Fade>
            {/* ==========END TITLE AND HEADER======================== */}

            {/* ==========PLAYER CONTAINER==================================== */}
            <Paper className={`player ${fullScreen && 'player-fullscreen'}`} sx={{ transitionDuration: '1s', borderRadius: 2, overflow: 'hidden', mb: 1, bgcolor: 'primary.dark', zIndex: '100000' }}>
              {/* =============IMAGE CONTAINER======================== */}
              <Fade in={!imgLoading}>
                <Paper sx={{ display: 'flex', width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexGrow: '1', borderRadius: '0', position: 'relative', bgcolor: 'primary.dark' }}>

                  {result.media_type === 'video' ?
                    <iframe
                      className={`${fitImage ? 'image-fit-contain' : 'image-fit-cover'}`}
                      src={result.url}
                      frameBorder="0"
                      allowFullScreen
                      title="Embedded youtube"
                      loop
                      onLoad={() => setImgLoading(false)}
                    />
                    :
                    !loading &&
                    <img
                      src={result.hdurl}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setFullScreen(state => !state)
                        document.body.style.zoom = 1.0
                      }} onLoad={() => setImgLoading(false)} className={`${fitImage ? 'image-fit-contain' : 'image-fit-cover'}`} />
                  }

                  {/* ===================HEART BUTTON======================== */}
                  <Button variant='text' color='primary' size='small' onClick={()=>handleLike(result.url,result.media_type)} sx={{ position: 'absolute', minWidth: '0', right: '17px', bottom: '10px', color: '#fafafa' }} >
                    <Typography variant='h4' component='span'>{imageLiked ? <i className="fas fa-heart" /> : <i className="far fa-heart"></i>}</Typography>
                  </Button>
                  {/* ===================END HEART BUTTON======================== */}

                </Paper>
              </Fade>
              {/* =============END IMAGE CONTAINER======================== */}

              {/* =============ACTION GROUP===================================== */}
              <Paper sx={{ display: 'flex', py: 1, pb: `${fullScreen ? '15px' : '10px'}`, justifyContent: 'space-between', bgcolor: 'red', borderRadius: '0', flexWrap: 'noWrap', bgcolor: 'primary.light' }}>
                {/* ===================EXPANDS BUTTON CONTAINER =================== */}
                <Box display='flex' sx={{ gap: 1 }}>
                  <Button
                    sx={{ minWidth: '35px', ml: 1 }}
                  >
                    <Typography variant='h4' color='#fafafa' component='span' onClick={() => {
                      setFullScreen(state => !state)
                      document.body.style.zoom = 1.0
                    }}><i className="fas fa-expand-alt" /></Typography>
                  </Button>
                  <Button
                    sx={{ minWidth: '35px' }}
                  >
                    <Typography variant='h4' color='#fafafa' component='span' onClick={() => setFitImage(state => !state)}><i className="fas fa-compress"></i></Typography>
                  </Button>
                  <Button
                    sx={{ minWidth: '45px' }}
                  >
                    <Typography variant='h4' color='#fafafa' component='span' onClick={() => setOpenInfo(state => !state)}><i className="fas fa-align-center" /></Typography>
                  </Button>

                </Box>
                {/* ===================END EXPANDS BUTTON CONTAINER =================== */}

                {/* ===================PREV-NEXT-DATE BUTTON CONTAINER =================== */}
                <Box display='flex' sx={{ alignItems: 'center' }}>
                  {imgLoading && <Loading />}
                  {/* ========================PREV BUTTON======================== */}
                  <Button
                    onClick={handleSub}
                    sx={{ minWidth: '45px' }}
                  >
                    <Typography variant='h4' color='#fafafa' component='span'><i className="fas fa-arrow-circle-left"></i></Typography>
                  </Button>
                  {/* ======================END PREV BUTTON====================== */}

                  {/* ========================CALENDAR BUTTON======================== */}
                  <Button variant='contained' onClick={handleClick} sx={{ display: { xs: 'none', sm: 'flex' }, px: 1, py: '0', minWidth: { xs: '90px', md: '140px' } }}>
                    <Typography variant='body1'>{format(dateQuery, "LLL-dd-yyyy")} <i className="far fa-calendar-alt" />
                    </Typography>
                  </Button>

                  <LocalizationProvider dateAdapter={AdapterDateFns}  >
                    <MobileDatePicker
                      minDate={new Date(1995, 5, 16)}
                      maxDate={date}
                      inputFormat="MM/dd/yy"
                      value={dateQuery}
                      onChange={(newValue) => {
                        setDateQuery(newValue);
                      }}
                      renderInput={(params) => <TextField size='small' sx={{ display: { xs: 'block', sm: 'none' }, width: '65px', padding: '0 0 !important', margin: '0', maxHeight: '30px' }} {...params} >
                      </TextField>}
                    />
                  </LocalizationProvider>
                  {/* ========================END CALENDAR BUTTON======================== */}

                  {/* ========================NEXT BUTTON======================== */}
                  <Button
                    disabled={formatISO9075(date, { representation: 'date' }) === formatISO9075(dateQuery, { representation: 'date' })}
                    onClick={handleAdd}
                    sx={{ minWidth: '35px' }}
                  >
                    <Typography
                      variant='h4'
                      component='span'
                      sx={{ mr: 2, color: `${formatISO9075(date, { representation: 'date' }) === formatISO9075(dateQuery, { representation: 'date' }) ? 'grey' : '#fafafa'}` }}>
                      <i className="fas fa-arrow-circle-right" />
                    </Typography>
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
              <Box component='article' display='block' sx={{ color: 'white', textAlign: 'center', maxWidth: { xs: '90%', sm: '60%', md: '600px' }, margin: '0 auto', py: 1 }}>
                <Typography variant='body1'>{result.explanation}</Typography>
              </Box>
            </Fade>
            {/* =================================END BODY================================= */}

          </>

        }
      </Container>
      {/* // MAIN ENDS HERE  */}
    </>
  )
}

export default Home;
