import React, { useState } from 'react';
import {Stack,Box, Typography, ListItem,List, Avatar, ListItemText, ListItemButton} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategoriesAction } from "../redux/slices/Category/categorySlices";
import { Link } from "react-router-dom";
import Products from './Products';
import {useTranslation} from 'react-i18next'
import i18next from 'i18next';




function Categories() {
  const {i18n,t} = useTranslation(['categories']);

  const [ctgr,setCategory] = useState("all");

  const category = useSelector(state => state?.category);
  const product = useSelector(state => state?.product);

  console.log(product.category);

  const { categoryList, loading, appErr, serverErr } = category;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]); 

  console.log("category list" +categoryList);

  
  return (
    <Box flex={2} p={1} sx={{}}>
        <Box sx={{background:"#fafafa",display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
          <Typography>{t("kategoriler")}</Typography>
        </Box>
        <Box sx={{background:"#ffffff",display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
          <List>
              {categoryList?.map((category)=>(
                  <Link to={`/getirmeyenin/kategoriler?category=${category.title}`} style={{ textDecoration: 'none' }}>
                    <ListItem sx={{display:"flex",justifyContent:"space-around"}}>
                        <Avatar variant="square" sx={{width:"30px",height:"30px"}} src={category.image} />
                        <ListItemText primary={category.title} sx={{marginLeft:"2em",color:"black",fontWeight:"bold"}} />
                        <ListItemButton>
                          <KeyboardArrowDownIcon sx={{marginLeft:"auto"}} />
                        </ListItemButton>
                    </ListItem>
                </Link>
              ))}
          </List>
        </Box>
    </Box>
  )
}

export default Categories