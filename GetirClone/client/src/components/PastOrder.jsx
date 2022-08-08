import { Box,IconButton,ListItem,Stack,Typography,List, Avatar } from '@mui/material'
import React from 'react';
import CottageIcon from '@mui/icons-material/Cottage';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {useTranslation} from 'react-i18next'
import i18next from 'i18next';



function PastOrder() {
    const {i18n,t} = useTranslation(['pastorders']);

  return (
    <Box sx={{marginTop:"2em"}}>
        <Box sx={{background:"#fafafa"}}>
          <Typography>{t("gecmissiparis")}</Typography>
        </Box>
        <Box sx={{background:"#ffffff"}}>
            <Stack direction="row" sx={{display:"flex",justifyContent:"space-around",margin:3}}>
                <IconButton>
                    <Avatar sx={{background:"white",border:"0.1px solid gray"}}>
                        <CottageIcon sx={{color:"red"}} />
                    </Avatar>
                </IconButton>
                <List sx={{marginLeft:"1em"}}>
                        <Typography sx={{fontWeight:"100",fontSize:"14px"}}>18 May 2022</Typography>
                        <Typography sx={{fontWeight:"100",fontSize:"14px"}}>19:15</Typography>
                        <Typography sx={{FontWeight:"bold",fontSize:"14px"}}>Ev</Typography>
                </List>
                <Box sx={{marginTop:"1.3em",marginLeft:"1em"}}>
                    <Stack direction="row" sx={{border:"0.5px solid gray",borderRadius:"5px",height:"37px"}}>
                            <ShoppingBasketIcon color="secondary" sx={{marginLeft:"0.5em",marginTop:"0.2em"}} />
                            <Box sx={{background:"#f2f0fe",marginLeft:"1em"}}>
                                <Typography sx={{fontWeight:"bold",fontSize:"14px",margin:1}}>
                                        ₺23.55
                                </Typography>
                            </Box>
                    </Stack>
                </Box>
            </Stack>
            <Stack direction="row" sx={{display:"flex",justifyContent:"space-around",margin:3}}>
                <IconButton>
                    <Avatar sx={{background:"white",border:"0.1px solid gray"}}>
                        <CottageIcon sx={{color:"red"}} />
                    </Avatar>
                </IconButton>
                <List sx={{marginLeft:"1em"}}>
                        <Typography sx={{fontWeight:"100",fontSize:"14px"}}>18 May 2022</Typography>
                        <Typography sx={{fontWeight:"100",fontSize:"14px"}}>19:15</Typography>
                        <Typography sx={{FontWeight:"bold",fontSize:"14px"}}>Ev</Typography>
                </List>
                <Box sx={{marginTop:"1.3em",marginLeft:"1em"}}>
                    <Stack direction="row" sx={{border:"0.5px solid gray",borderRadius:"5px",height:"37px"}}>
                            <ShoppingBasketIcon color="secondary" sx={{marginLeft:"0.5em",marginTop:"0.2em"}} />
                            <Box sx={{background:"#f2f0fe",marginLeft:"1em"}}>
                                <Typography sx={{fontWeight:"bold",fontSize:"14px",margin:1}}>
                                        ₺23.55
                                </Typography>
                            </Box>
                    </Stack>
                </Box>
            </Stack>
            <Stack direction="row" sx={{display:"flex",justifyContent:"space-around",margin:3}}>
                <IconButton>
                    <Avatar sx={{background:"white",border:"0.1px solid gray"}}>
                        <CottageIcon sx={{color:"red"}} />
                    </Avatar>
                </IconButton>
                <List sx={{marginLeft:"1em"}}>
                        <Typography sx={{fontWeight:"100",fontSize:"14px"}}>18 May 2022</Typography>
                        <Typography sx={{fontWeight:"100",fontSize:"14px"}}>19:15</Typography>
                        <Typography sx={{FontWeight:"bold",fontSize:"14px"}}>Ev</Typography>
                </List>
                <Box sx={{marginTop:"1.3em",marginLeft:"1em"}}>
                    <Stack direction="row" sx={{border:"0.5px solid gray",borderRadius:"5px",height:"37px"}}>
                            <ShoppingBasketIcon color="secondary" sx={{marginLeft:"0.5em",marginTop:"0.2em"}} />
                            <Box sx={{background:"#f2f0fe",marginLeft:"1em"}}>
                                <Typography sx={{fontWeight:"bold",fontSize:"14px",margin:1}}>
                                        ₺23.55
                                </Typography>
                            </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    </Box>
  )
}

export default PastOrder