import { Box, Container, Fade, ImageList, ImageListItem, Skeleton, Typography } from '@mui/material'
import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'

const Gallery = () => {
    const URL = 'https://api.nasa.gov/planetary/apod?api_key=l7jgCPMiMB7154fyZifWUm5LpKGi4YDiDIt92cgr&date='
    // {"2022-01-15":{"date":"2022-01-15","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/PIA19048europa1024.jpg","type":"image"},"2022-01-14":{"date":"2022-01-14","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/NGC1566LRGBHa-Hanson-SelbyFinal1024.jpg","type":"image"},"2022-01-13":{"date":"2022-01-13","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/HOOClassicBinned_ps1024.jpg","type":"image"},"2022-01-10":{"date":"2022-01-10","liked":true,"url":"https://www.youtube.com/embed/RtDSxi-D4KA?rel=0","type":"video"},"2022-01-11":{"date":"2022-01-11","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/OrionStarFree3_Harbison_1080.jpg","type":"image"},"2022-01-08":{"date":"2022-01-08","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/QuadrantidsnorthernskyRadioTelescopeArray1024.jpg","type":"image"},"2022-01-05":{"date":"2022-01-05","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/SunriseYear_Vanzella_960.jpg","type":"image"},"2021-12-29":{"date":"2021-12-29","liked":true,"url":"https://apod.nasa.gov/apod/image/2112/JupiterStorms_JunoGill_1024.jpg","type":"image"}}
    let sample = { "2022-01-14": { "date": "2022-01-14", "liked": true, "url": "https://apod.nasa.gov/apod/image/2201/NGC1566LRGBHa-Hanson-SelbyFinal1024.jpg", "type": "image" }, "2021-12-24": { "date": "2021-12-24", "liked": true, "url": "https://apod.nasa.gov/apod/image/2112/Sherick_M1_SHOLRGB_12-5-21a_1024.jpg", "type": "image" }, "2021-12-22": { "date": "2021-12-22", "liked": true, "url": "https://apod.nasa.gov/apod/image/2112/IxpeLaunch_Sirokie_960.jpg", "type": "image" }, "2021-12-14": { "date": "2021-12-14", "liked": true, "url": "https://apod.nasa.gov/apod/image/2112/HH666_HubbleOzsarac_960.jpg", "type": "image" }, "2021-12-11": { "date": "2021-12-11", "liked": true, "url": "https://apod.nasa.gov/apod/image/2112/eclipse_apod1024.jpg", "type": "image" }, "2013-11-28": { "date": "2013-11-28", "liked": true, "url": "https://apod.nasa.gov/apod/image/1311/NGC1999-Subaru-HST-S950.jpg", "type": "image" }, "2013-11-18": { "date": "2013-11-18", "liked": true, "url": "https://apod.nasa.gov/apod/image/1311/auroraiceland_vetter_960.jpg", "type": "image" } }
    const [images, setImages] = useState([])
    // console.log('IN UE')
    let obj = JSON.parse(localStorage.getItem('likedImagesSG')) || sample
    let ar = []
    for (const property in obj) {
        console.log(property)
        ar.push(obj[property])
    }
    useEffect(() => {
        setImages(ar)
        return () => setImages([])
    }, [])
    return (
        <Fade in={images}>
            <Container maxWidth='xl' sx={{ minHeight: '100vh', textAlign: 'center' }}>
                <Typography variant='h2' gutterBottom sx={{ pt: '40px' }}>
                    {images[0] ? 'GALLERY' : 'GALLERY EMPTY'}
                </Typography>
                <Typography variant='body2'>
                    <i className="fas fa-heart" /> An image to add it to the gallery
                </Typography>
                <ImageList variant="masonry" cols={3} gap={4}>
                    {images && images.map((image) => {
                        return (
                            <Fade key={image.date} in={true}>
                                <ImageListItem key={image.date} sx={{ position: 'relative' }}>
                                    {image.type === 'image' &&
                                        <Card url={image.url} date={image.date}/>
                                        // <>
                                        //     <img
                                        //         src={image.url}
                                        //         // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        //         alt={image.date}
                                        //         loading="lazy"
                                        //         style={{ width: '248' }}
                                        //     />
                                        //     <Typography color='grey.600' sx={{ textShadow: '2px 2px 5px #666', fontSize: { xs: '.47rem', md: '.8rem', position: 'absolute', bottom: '2px', left: '2px' } }}>{image.date}</Typography>
                                        // </>
                                    }
                                </ImageListItem>
                            </Fade>
                        )
                    })}
                </ImageList>
            </Container>
        </Fade>
    )
}
const Card = ({ url, date }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        return (() => {
            setImgLoaded(false)
            setError(false)
        })
    }, [])
    return (
        <>
            <img
                src={url}
                // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={date}
                loading="lazy"
                className='image-fit-cover'
                style={{ opacity: `${imgLoaded && !error ? '1' : '0'}`,minHeight:`${imgLoaded?'0':'350px'}` }}
                onLoad={() => {
                    setImgLoaded(true)
                    setError(false)
                }}
                onerror={() => {
                    setError(true)
                    setImgLoaded(true)
                }}

            />
          {!imgLoaded&& <Skeleton variant="rectangular" width='100%' height='100%' sx={{position:'absolute',top:'0',left:'0'}} />} 
          {imgLoaded&& <Typography color='grey.600' sx={{ textShadow: '2px 2px 5px #666', fontSize: { xs: '.47rem', md: '.8rem', position: 'absolute', bottom: '2px', left: '2px' } }}>{date}</Typography>} 
        </>
    )
}
export default Gallery
