import React from 'react';
import Navigate from './navigate';
import CottageIcon from '@mui/icons-material/Cottage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Stack ,Box, List, ListItem, ListItemButton, Typography,Grid,Avatar} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getAllLikedProducts} from '../redux/slices/User/userSlices';


function FavauriteProducts() {

  const dispatch = useDispatch();

  const user = useSelector(store=>store?.user);
  const { likedProducts, loading, appErr, serverErr } = user;

  useEffect(()=>{
    dispatch(getAllLikedProducts());
  },[]);

  console.log("like products :",likedProducts);


  return (
    <Stack direction="row">
    <Navigate />
    <Box flex={5}  sx={{background:"white",marginLeft:"2rem",marginRight:"22rem",marginTop:"2rem"}}>
        <Typography>Favoriler</Typography>
        <Grid container sx={{background:"#ffffff"}} spacing={4}>
            {likedProducts?.map((product)=>(
                       <Grid item sx={{display:"flex",alignItems:"center",justifyContent:"center"}} lg={4} md={4} sm={4} xs={4}>
                       <Box SX={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                           <AddIcon color="secondary" sx={{border:"1px solid #faf321",borderRadius:"8px",cursor:"pointer"}} />
                           <Avatar variant='square' sx={{width:"80%",height:"80%"}} src={product.image} />
                           <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",width:"80%",height:"80%"}}>
                             <Typography variant="h6" color="secondary" sx={{marginTop:"1em",fontSize:"18px",fontWeight:"bold"}}>
                               ₺{product.price}
                             </Typography>
                           </Box>
                           <Box sx={{display:"flex",alignItems:"center",width:"80%",height:"80%",justifyContent:"center"}}>
                             <Typography sx={{marginTop:"0.4em",fontWeight:"bold",fontSize:"12px"}}>
                               {product.title}
                             </Typography>
                           </Box>
                           <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",width:"80%",height:"80%"}}>
                             <Typography sx={{marginTop:"0.4em"}}>
                                 {product.description}
                             </Typography>
                           </Box>
                       </Box>
                   </Grid>
            ))}
        </Grid>
    </Box>
</Stack>
  )
}

export default FavauriteProducts