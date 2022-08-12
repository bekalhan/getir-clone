import React from 'react';
import {Box,AppBar,Toolbar,Menu,MenuItem,Stack, ListItem,List, Typography, ListItemIcon,Button,Modal, RadioGroup,Radio,FormControlLabel, Avatar} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import trk from '../img/trk.png';
import ing from '../img/ing.png';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect } from "react";
import {useTranslation} from 'react-i18next'
import i18next from 'i18next';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logoutAction} from '../redux/slices/User/userSlices';




function Navbar() {
    const dispatch = useDispatch();

    const {i18n,t} = useTranslation(['header']);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 100,
        p: 4,
      };

    const [open, setOpen] = React.useState(false);
    const [open2,setOpen2] = useState(false);
    const handleClose = () => setOpen(false);

    const user = useSelector(state=>state?.user);
    const userAuth = user.userAuth;

    console.log("auth :",userAuth);


    useEffect(() => {
		if (localStorage.getItem("i18nextLng")?.length > 2) {
			i18next.changeLanguage("tur");
		}
	}, []);

    const handleLanguageChange = (e) => {
        const language = localStorage.getItem("i18nextLng");
        if(language==="tur"){
            i18n.changeLanguage("en");
        }else{
            i18n.changeLanguage("tur");
        }
	};

  return (
    <AppBar position='stick'>
        <Toolbar sx={{background:"#4c3397",display:"flex",justifyContent:"space-around" ,height:{xs:"10px"}}}>
            <Stack direction="row" sx={{display:{lg:"flex",md:"flex",sm:"flex",xs:"none"},justifyContent:"space-around"}}>
                <Stack direction="row" sx={{cursor:"pointer"}}>
                    <ListItem sx={{background:"#5d3ebc",height:"70px",borderRadius:"3px",color:"#ffd404"}}>{t("getir")}</ListItem>
                    <ListItem>{t("getiryemek")}</ListItem>
                    <ListItem>{t("getirbüyük")}</ListItem>
                    <ListItem>{t("getirsu")}</ListItem>
                    <ListItem>{t("getirçarşı")}</ListItem>
                </Stack>
                <Box sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
                <Stack direction="row" sx={{marginLeft:{lg:"17rem",md:"1rem",marginTop:"1em"}}}>
                   <ListItem>
                        <ListItemIcon sx={{color:"white"}}>
                            <LanguageIcon sx={{cursor:"pointer"}} onClick={()=>{handleLanguageChange()}}  />
                            <Typography onClick={()=>{handleLanguageChange()}} sx={{marginLeft:"0.5em",cursor:"pointer"}}>{t("dil")}</Typography>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon sx={{color:"white"}}>
                            <CardGiftcardIcon sx={{cursor:"pointer"}} />
                            <Typography sx={{marginLeft:"0.5em",cursor:"pointer"}}>{t("hediyeler")}</Typography>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon sx={{color:"white"}}>
                            <PersonIcon />
                            <Typography sx={{marginLeft:"0.5em"}}>{t("profil")}</Typography>
                            {!open2 ? (
                                 <KeyboardArrowDownIcon sx={{marginLeft:"0.4em"}} onClick={e=>setOpen2(true)} />

                            ):(
                                <KeyboardArrowUpIcon />
                            )}
                        </ListItemIcon>
                    </ListItem>
                </Stack>
                </Box>
                <Box sx={{display:{lg:"none",md:"none",sm:"block",xs:"none"}}}>
                <Stack direction="row" sx={{marginLeft:{sm:"5rem"},marginTop:"1em"}}>
                    <ListItem>
                        <ListItemIcon>
                            <LanguageIcon sx={{color:"white"}} />
                            <CardGiftcardIcon sx={{marginLeft:"1em",color:"white"}} />
                            <PersonIcon sx={{marginLeft:"1em",color:"white"}} />
                            <KeyboardArrowDownIcon sx={{color:"white"}} />
                        </ListItemIcon>
                    </ListItem>
                </Stack>
                </Box>
            </Stack>
            <Stack direction="row" sx={{display:{lg:"none",md:"none",sm:"none",xs:"flex"},marginLeft:"0px",marginRight:"160px",justifyContent:"flex-start"}}>
                <Stack direction="row">
                    <ListItem>
                        <Typography sx={{marginLeft:"1.3em",fontSize:"16px"}}>{t("getir")}</Typography>
                        <Typography sx={{marginLeft:"1.3em",fontSize:"16px"}}>{t("getiryemek")}</Typography>
                        <Typography sx={{marginLeft:"1.3em",fontSize:"16px"}}>{t("getirbüyük")}</Typography>
                        <Typography sx={{marginLeft:"1.3em",fontSize:"16px"}}>{t("getirsu")}</Typography>
                        <Typography sx={{marginLeft:"1.3em",fontSize:"16px"}}>{t("getirçarşı")}</Typography>
                    </ListItem>
                </Stack>
            </Stack>
        <Menu

        sx={{marginTop:"40px"}}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        onClose={e =>setOpen2(false)}
        open={open2}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem sx={{width:"280px",background:"#f2f0fe",padding:2}}>
            <Stack direction="row">
                <Avatar variant="square" />
                <Box>
                    <Typography sx={{marginLeft:"1em",fontWeight:"bold",fontSize:"14px"}}>Berat Kalhan</Typography>
                    <Typography sx={{fontWeight:"100",fontSize:"12px",marginLeft:"1em"}}>+05537705969</Typography>
                </Box>
            </Stack>
        </MenuItem>
        <MenuItem sx={{marginTop:"0.3em"}}>
            <Link to="/getirmeyenin/hesap/adreslerim" style={{textDecoration:"none",color:"black"}} onClick={()=>{setOpen2(false)}} >
                 {t("adreslerim")}
            </Link>
        </MenuItem>
        <MenuItem  sx={{marginTop:"0.3em"}} onClick={() => dispatch(logoutAction())}>{t("cıkıs")}</MenuItem>

      </Menu>

      {/* Basket */}
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack direction="row" sx={{dispkay:"flex",justifyContent:"flex-start"}}>
            <Box sx={{display:"flex",justifyContent:"center"}}>
                <Typography id="modal-modal-title" component="h2" color="secondary" sx={{fontSize:"18px",fontWeight:"bold",marginLeft:"9rem"}}>
                Dil Değiştir
                </Typography>
            </Box>
            <Box sx={{marginLeft:"auto"}}>
                <CloseIcon onClick={handleClose} />
            </Box>
        </Stack>
        <Box>
            <RadioGroup>
            <List>
                <ListItem sx={{border:"10px solid #fdfdfd",display:"flex",justifyContent:"space-between"}}>
                       <FormControlLabel value="turkce" control={<Radio />} label="Türkçe" />
                       <Avatar variant="square" src={trk} sx={{width:"40px",height:"30px"}} />
                </ListItem>
                <ListItem sx={{border:"10px solid #fdfdfd",display:"flex",justifyContent:"space-between"}}>
                       <FormControlLabel value="ingilizce" control={<Radio />} label="İngilizce" />
                       <Avatar variant="square" src={ing} sx={{width:"40px",height:"30px"}} />
                </ListItem>
            </List>   
            </RadioGroup> 
        </Box>
        <Box sx={{display:"flex",justifyContent:"center"}}>
            <Button variant="contained" color="secondary" sx={{width:"90%",marginTop:"2em"}}>Güncelle</Button>
        </Box>
        </Box>
      </Modal>


        </Toolbar>
    </AppBar>
  )
}

export default Navbar