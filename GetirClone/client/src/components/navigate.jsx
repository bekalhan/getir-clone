import React from 'react';
import {Box, ListItem, ListItemText,List} from '@mui/material';
import { Link } from "react-router-dom";


function navigate() {
  return (
    <Box flex={2} sx={{background:"#fafafa",border:"5px solid #fefefe",marginLeft:"5rem",marginTop:"2rem",display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
        <List>
            <Link to="/getirmeyenin/hesap/adreslerim" style={{textDecoration:"none"}}>
            <ListItem>
                <ListItemText primary="Adreslerim" sx={{cursor:"pointer"}} />
            </ListItem>
            </Link>
            <hr></hr>

            <ListItem>
                <ListItemText primary="Geçmiş Siparişlerim" sx={{cursor:"pointer"}} />
            </ListItem>
            <hr></hr>

            <ListItem>
                <ListItemText primary="Ödeme Yöntemlerim" sx={{cursor:"pointer"}} />
            </ListItem>
            <hr></hr>

            <ListItem>
                <ListItemText primary="Fatura Bilgileri" sx={{cursor:"pointer"}} />
            </ListItem>
            <hr></hr>

            <ListItem>
                <ListItemText primary="İletişim Tercihleri" sx={{cursor:"pointer"}} />
            </ListItem>
        </List>
    </Box>
  )
}

export default navigate