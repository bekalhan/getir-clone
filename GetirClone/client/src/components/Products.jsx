import React,{useContext} from 'react';
import {Stack,Box,Typography,Grid,Avatar} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductBelongCategory } from "../redux/slices/Product/productSlices";
import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom'
import queryString from 'query-string';
import AddIcon from '@mui/icons-material/Add';
import {userAddProductToBasket} from '../redux/slices/User/userSlices';
import MyBasket from './MyBasket';

function Products() {

  const {search} =useLocation();
  const {category} = queryString.parse(search);

  const product = useSelector(state => state?.product);

  const { productsbelongcategory, loading, appErr, serverErr } = product;

  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getProductBelongCategory(category));
  }, [dispatch]); 

 const AddBasket = (id)=>{
    dispatch(userAddProductToBasket(id));
  }



  return (
    <Box sx={{flex:{lg:"4",md:"4"}}} p={1}>
        <Box sx={{background:""}}>
          <Typography>Ürünler</Typography>
        </Box>
        <Box sx={{background:"#ffffff"}}>
           <Grid container sx={{background:"#ffffff"}} spacing={4}>
                    {productsbelongcategory?.map((product)=>(
                      <Grid item sx={{display:"flex",alignItems:"center",justifyContent:"center"}} lg={4} md={4} sm={4} xs={4}>
                        <Box SX={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <AddIcon color="secondary" sx={{border:"1px solid #faf321",borderRadius:"8px",cursor:"pointer"}} onClick={()=>AddBasket(product.id)} />
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
    </Box>
  )
}

export default Products;