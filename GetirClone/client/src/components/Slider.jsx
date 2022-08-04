import React from 'react';
import {Stack,Box, Avatar} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import getir from '../img/getir.png'
import getir4 from '../img/getir4.jpeg';
import getir7 from '../img/getir7.jpeg';

function Slider() {
  return (
    <Stack direction="row" sx={{display:"flex",justifyContent:"center",height:"200px"}}>
      <Box sx={{marginTop:"2em",height:"200px",justifyContent:"center"}}>
        <ArrowBackIosNewIcon  sx={{textAlign:"center",color:"gray",marginTop:"80px",marginRight:"1em"}} />
      </Box>
        <Stack direction="row" sx={{width:{lg:"80%",md:"80%",sm:"100%",xs:"100%"},marginTop:"2em",height:"200px"}}>
            <Avatar variant="square" src={getir} sx={{width:{lg:"33%",md:"50%",sm:"0%",xs:"0%"},height:"200px",marginRight:"1em"}} />
            <Avatar variant="square" src={getir4} sx={{width:{lg:"33%",md:"50%",sm:"100%",xs:"100%"},height:"200px",marginRight:"1em"}} />
            <Avatar variant="square" src={getir7} sx={{width:{lg:"33%",md:"0%",sm:"0%",xs:"0%"},height:"200px"}} />
        </Stack>
        <Box sx={{marginTop:"2em",height:"200px",justifyContent:"center"}}>
        <ArrowForwardIosIcon  sx={{textAlign:"center",color:"gray",marginTop:"80px",marginLeft:"2em"}} />
      </Box>
    </Stack>
  )
}

export default Slider