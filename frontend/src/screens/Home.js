import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Typography,
  Fade,
  Popover,
  Backdrop as MuiBackdrop,
} from '@mui/material'
import { addDays, subDays, formatISO9075 } from 'date-fns'
import { BackDrop } from '../components/BackDrop'
import Calendar from '../components/Calendar'
import PlayerHeader from '../components/PlayerHeader'
import PlayerMedia from '../components/PlayerMedia'
import PlayerControl from '../components/PlayerControl'
import Player from '../components/Player'
import Main from '../components/Main'

function Home() {
  const date = new Date()
  const [result, setResult] = useState(null)
  const [dateQuery, setDateQuery] = useState(new Date('2022', '00', '24'))
  const [loading, setLoading] = useState(true)
  const [imgLoading, setImgLoading] = useState(true)
  const [imageLiked, setImageLiked] = useState(false)
  const [fitImage, setFitImage] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const [error, setError] = useState('')

  const URL = 'https://api.nasa.gov/planetary/apod?api_key=l7jgCPMiMB7154fyZifWUm5LpKGi4YDiDIt92cgr&date='

  const handleAdd = () => {
    setDateQuery(addDays(dateQuery, 1))
  }
  const handleSub = () => {
    setDateQuery(subDays(dateQuery, 1))
  }
  const handleLike = (imgUrl, type) => {
    setImageLiked((state) => !state)
    const localStrg = JSON.parse(localStorage.getItem('likedImagesSG')) || {}
    const imgDate = String(formatISO9075(dateQuery, { representation: 'date' }))
    if (imageLiked) {
      delete localStrg[imgDate]
    } else {
      localStrg[imgDate] = {
        date: imgDate,
        liked: true,
        url: imgUrl,
        type: type,
      }
    }
    localStorage.setItem('likedImagesSG', JSON.stringify({ ...localStrg }))
  }

  //POPOVER CALENDAR FOR DESKTOP
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenCalendar = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseCalendar = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  // const id = open ? 'simple-popover' : undefined
  //POPOVER END

  //BACKDROP CALENDER FOR MOBILE
  const [openMobileCal, setOpenMobileCal] = useState(
    localStorage.getItem('openCalendarAtOpen') === 'false' ? false : true
  )
  //BACKDROP CALENDER
  const fetchData = async (abortCtrl) => {
    setError('')
    await axios
      .get(URL + formatISO9075(dateQuery, { representation: 'date' }), {
        signal: abortCtrl.signal,
      })
      .then(({ data }) => {
        setResult(data)
        setLoading(false)
      })
      .catch((e) => {
        if (!axios.isCancel(e))
          setError(
            'No data found for ' +
            formatISO9075(dateQuery, { representation: 'date' })
          )
        // console.log('No data found for ' + formatISO9075(dateQuery, { representation: 'date' }))
      })
  }

  useEffect(() => {
    //FETCH DATA AFTER DATE CHANGE
    // console.log(dateQuery)
    const abortCtrl = new AbortController()
    setLoading(true)
    setImgLoading(true)
    fetchData(abortCtrl)
    return () => abortCtrl.abort()
  }, [dateQuery])

  useEffect(() => {
    //CHECK IF IMAGE WAS LIKED AFTER DATE CHANGE
    let obj = JSON.parse(localStorage.getItem('likedImagesSG')) || {}
    const imgDate = String(formatISO9075(dateQuery, { representation: 'date' }))
    if (obj[imgDate]) setImageLiked(true)
    else setImageLiked(false)
  }, [dateQuery])

  useEffect(() => {
    localStorage.setItem('openCalendarAtOpen', false)
  }, [])
  return (
    <>
      {/* // MAIN STARTS HERE */}
      <Main>
        {result && (
          <>
            {/* ===========CALENDARS============================= */}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseCalendar}
              in={{
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
              <Calendar
                date={date}
                setDateQuery={setDateQuery}
                dateQuery={dateQuery}
              />
            </Popover>
            <MuiBackdrop
              sx={{
                color: '#fbfbfb',
                zIndex: '10000000',
                bgcolor: 'rgba(0,0,0,.6)',
              }}
              open={openMobileCal}
              onClick={() => setOpenMobileCal(false)}
            >
              <Box
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <Calendar
                  date={date}
                  setDateQuery={setDateQuery}
                  dateQuery={dateQuery}
                  setOpenMobileCal={setOpenMobileCal}
                />
              </Box>
            </MuiBackdrop>
            {/* ===========END CALENDAR========================== */}
            {/* ===========PLAYER================================ */}
            <PlayerHeader title={result.title} loading={loading} />
            <Player fullScreen={fullScreen}>
              <PlayerMedia
                imgLoading={imgLoading}
                result={result}
                fitImage={fitImage}
                setImgLoading={setImgLoading}
                loading={loading}
                imageLiked={imageLiked}
                setFullScreen={setFullScreen}
                handleLike={handleLike}
              />
              <PlayerControl
                fullScreen={fullScreen}
                setFullScreen={setFullScreen}
                setFitImage={setFitImage}
                setOpenInfo={setOpenInfo}
                error={error}
                imgLoading={imgLoading}
                handleSub={handleSub}
                handleAdd={handleAdd}
                handleOpenCalendar={handleOpenCalendar}
                setOpenMobileCal={setOpenMobileCal}
                date={date}
                dateQuery={dateQuery}
              />
            </Player>
            {/* ===========END PLAYER =========================== */}

            {/* ===========BODY================================== */}
            <BackDrop
              openInfo={openInfo}
              setOpenInfo={setOpenInfo}
              title={result.title}
              explanation={result.explanation}
            />
            <Fade in={!loading}>
              <Box
                component='article'
                display='block'
                sx={{
                  color: 'white',
                  textAlign: 'center',
                  maxWidth: { xs: '90%', sm: '60%', md: '600px' },
                  margin: '0 auto',
                  py: 1,
                }}
              >
                <Typography variant='body1'>{result.explanation}</Typography>
              </Box>
            </Fade>
            {/* ===========END BODY============================== */}
          </>
        )}
      </Main>
      {/* // MAIN ENDS HERE  */}
    </>
  )
}

export default Home
