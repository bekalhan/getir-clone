import React from 'react';
import {Box,Typography,ListItem,Stack} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getAllProductFromBasket,getTotalPriceFromBasket,getQuantityFromBasket,userDeleteProductFromBasket,userAddProductToBasket} from '../redux/slices/User/userSlices';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from 'react-i18next'
import i18next from 'i18next';



function MyBasket() {
  const {i18n,t} = useTranslation(['mybasket']);
  const dispatch = useDispatch();

  const user = useSelector(state => state?.user);

  const {quantity,totalPrice ,productList, loading, appErr, serverErr } = user;

  useEffect(() => {
    console.log("my basket component effect");
    dispatch(getAllProductFromBasket());
    dispatch(getTotalPriceFromBasket());
    dispatch(getQuantityFromBasket());
  }, []); 

  const deleteProductFromBasket = (id)=>{
    dispatch(userDeleteProductFromBasket(id));
  };

  const addProductToBasket = (id)=>{
    dispatch(userAddProductToBasket(id));
  };


  return (
  <Box>
  <Box sx={{background:"#fafafa"}}>
    <Typography>{t("sepetim")}</Typography>
  </Box>
  <Box sx={{background:"#ffffff",width:"100%",height:"",display:"flex",justifyContent:"center",border:"2.3px solid #ffd404"}}>
    {!totalPrice>0 ? (
            <Box>
            <Box sx={{marginTop:"4rem"}}>
              <Box sx={{display:"flex",justifyContent:"center"}}>
                <ShoppingBasketIcon sx={{color:"#dbdbff",fontSize:"150px"}} />        
              </Box>
              <Box sx={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
                  <Typography color="secondary" sx={{fontWeight:"bold"}}>
                        {t("sepetbos")}
                  </Typography>
              </Box>
              <Typography sx={{display:"flex",justifyContent:"center",marginLeft:"3em",marginRight:"3em",marginTop:"1em",marginBottom:"3em"}}>
                  {t("eklemsg")}
              </Typography>
              </Box>
          </Box>
    ):(
      <Box>
        {productList?.map((product)=>(
          <Box sx={{display:"flex",justifyContent:"space-between"}}>
              <Box sx={{marginTop:"2em"}}>
                <Typography sx={{marginRight:"1em",fontWeight:"100"}}>{product.title}</Typography>
                <Box sx={{display:"flex",justifyContent:"flex-start"}}>
                  <Typography color="secondary" sx={{fontWeight:"bold"}}>₺{product.price}</Typography>
                </Box>
              </Box>
              <Stack direction="row" sx={{marginTop:"2em"}}>
                <DeleteIcon color="secondary" sx={{border:"5px solid #f4f4f4",cursor:"pointer"}} onClick={()=>{deleteProductFromBasket(product.id)}} />
                <Typography sx={{marginTop:"0.3em",marginLeft:"0.1em",marginRight:"0.1em"}}>1</Typography>
                <AddIcon color="secondary" sx={{border:"5px solid #f4f4f4",cursor:"pointer"}} onClick={()=>{addProductToBasket(product.id)}}  />
              </Stack>
          </Box>
        ))}
      <Box sx={{display:"flex",justifyContent:"center",marginTop:"2em"}}>
          <Typography sx={{fontWeight:"bold",fontSize:"24px"}}>₺{totalPrice}</Typography>
      </Box>
      <Box sx={{width:"100%",background:"#5e3ebc",marginTop:"1em",marginBottom:"2em",borderRadius:"8px",display:"flex",justifyContent:"center"}}>
            <Typography color="white" sx={{fontWeight:"bold"}}>{t("sepetgit")}</Typography>
      </Box>
      
      </Box>
    )}

  </Box>
  </Box>
  )
}

export default MyBasket;