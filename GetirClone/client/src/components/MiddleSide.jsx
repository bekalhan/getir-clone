import React from 'react';
import {Stack,Box} from '@mui/material';
import Slider from './Slider';
import Categories from './Categories';
import Products from './Products';
import Basket from './Basket';

function MiddleSide() {
  return (
    <Stack direction="column" sx={{background:"#fafafa"}}>
        <Slider />
        <Box sx={{display:"flex",justifyContent:"center"}}>
            <Stack direction="row" sx={{marginTop:"3em",width:"95%"}}>
                <Categories />
                <Products sx={{marginLeft:"5em"}} />
                <Basket />
            </Stack>
        </Box>
    </Stack>
  )
}

export default MiddleSide