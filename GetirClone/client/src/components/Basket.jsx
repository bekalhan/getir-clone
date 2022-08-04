import React from 'react';
import {Box, Stack,Typography} from '@mui/material';
import MyBasket from './MyBasket';
import PastOrder from './PastOrder';

function Basket() {
  return (
    <Box flex={2} p={1} sx={{display:{lg:"block",md:"none",sm:"none",xs:"none"}}}>
      <MyBasket />
      <PastOrder />
    </Box>
  )
}

export default Basket