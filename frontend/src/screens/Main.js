import { Box, Container } from '@mui/material'
import React from 'react'

const Main = ({result}) => {
    return (
        <Container maxWidth='lg' sx={{bgcolor:'red', display:'flex', alignItems:'center',minHeight:'100vh'}}>
            {/* IMAGE CONTAINER */}
            <Box display='flex' sx={{aspectRatio:'16/9',width:'100%', bgcolor:'green'}}>
                <img src={result.url} className='image-fit-cover'/>
            </Box>
        </Container>
    )
}

export default Main
