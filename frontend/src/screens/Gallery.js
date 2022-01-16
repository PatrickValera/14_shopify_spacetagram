import { Container, Fade, ImageList, ImageListItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Gallery = () => {
    const URL = 'https://api.nasa.gov/planetary/apod?api_key=l7jgCPMiMB7154fyZifWUm5LpKGi4YDiDIt92cgr&date='
    // {"2022-01-15":{"date":"2022-01-15","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/PIA19048europa1024.jpg","type":"image"},"2022-01-14":{"date":"2022-01-14","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/NGC1566LRGBHa-Hanson-SelbyFinal1024.jpg","type":"image"},"2022-01-13":{"date":"2022-01-13","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/HOOClassicBinned_ps1024.jpg","type":"image"},"2022-01-10":{"date":"2022-01-10","liked":true,"url":"https://www.youtube.com/embed/RtDSxi-D4KA?rel=0","type":"video"},"2022-01-11":{"date":"2022-01-11","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/OrionStarFree3_Harbison_1080.jpg","type":"image"},"2022-01-08":{"date":"2022-01-08","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/QuadrantidsnorthernskyRadioTelescopeArray1024.jpg","type":"image"},"2022-01-05":{"date":"2022-01-05","liked":true,"url":"https://apod.nasa.gov/apod/image/2201/SunriseYear_Vanzella_960.jpg","type":"image"},"2021-12-29":{"date":"2021-12-29","liked":true,"url":"https://apod.nasa.gov/apod/image/2112/JupiterStorms_JunoGill_1024.jpg","type":"image"}}
    const [images, setImages] = useState([])
    // console.log('IN UE')
    let obj = JSON.parse(localStorage.getItem('likedImagesSG')) || {}
    let ar = images
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
            <Container maxWidth='xl' sx={{ minHeight: '100vh' }}>
                <Typography variant='h2' sx={{ pt: '40px', textAlign: 'center' }}>
                    {images[0]?'GALLERY':'GALLERY EMPTY'}
                </Typography>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {images && images.map((image) => {
                        return (
                            <Fade in={true}>
                            <ImageListItem key={image.date}>
                                    {image.type === 'image' &&
                                        <img
                                            src={image.url}
                                            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={image.date}
                                            loading="lazy"
                                            style={{ width: '248' }}
                                            // onLoad={() => setImgLoaded({...imgLoaded,image:true})}
                                        />
                                        // :
                                        // <iframe
                                        //     style={{ width: '400' }}
                                        //     src={image.url}
                                        //     frameBorder="0"
                                        //     title="Embedded youtube"
                                        //     loop
                                        // />
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

export default Gallery
