import { Button, Fade, Paper, Typography } from '@mui/material'
import React from 'react'

const PlayerMedia = ({imgLoading,result,fitImage,setImgLoading,loading,imageLiked,setFullScreen,handleLike}) => {
    return (
        <Fade in={!imgLoading}>
                <Paper
                  sx={{
                    display: 'flex',
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    flexGrow: '1',
                    borderRadius: '0',
                    position: 'relative',
                    bgcolor: 'primary.dark',
                  }}
                >
                  {result.media_type === 'video' ? (
                    <iframe
                      className={`${
                        fitImage ? 'image-fit-contain' : 'image-fit-cover'
                      }`}
                      src={result.url}
                      frameBorder='0'
                      allowFullScreen
                      title='Embedded youtube'
                      loop
                      onLoad={() => setImgLoading(false)}
                    />
                  ) : (
                    !loading && (
                      <img
                        src={result.url}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setFullScreen((state) => !state)
                          document.body.style.zoom = 1.0
                        }}
                        onLoad={() => setImgLoading(false)}
                        className={`${
                          fitImage ? 'image-fit-contain' : 'image-fit-cover'
                        }`}
                      />
                    )
                  )}

                  {/* ===================HEART BUTTON======================== */}
                  <Button
                    variant='text'
                    color='primary'
                    size='small'
                    onClick={() => handleLike(result.url, result.media_type)}
                    sx={{
                      p: '7px',
                      position: 'absolute',
                      minWidth: '0',
                      right: '17px',
                      bottom: '10px',
                      color: '#fafafa',
                    }}
                  >
                    <Typography variant='h4' component='span'>
                      {imageLiked ? (
                        <i className='fas fa-heart' />
                      ) : (
                        <i className='far fa-heart'></i>
                      )}
                    </Typography>
                  </Button>
                  {/* ===================END HEART BUTTON======================== */}
                </Paper>
              </Fade>
    )
}

export default PlayerMedia
