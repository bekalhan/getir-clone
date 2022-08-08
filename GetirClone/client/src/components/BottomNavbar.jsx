import React,{useState} from 'react';
import {Box,AppBar,Toolbar,Stack, Typography, TextField,Paper,IconButton,InputBase,Divider,Modal,Button,Menu,MenuItem,Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CottageIcon from '@mui/icons-material/Cottage';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getAllProductFromBasket,getTotalPriceFromBasket,getQuantityFromBasket,userAddProductToBasket,userDeleteProductFromBasket} from '../redux/slices/User/userSlices';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


function BottomNavbar() {

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

    const dispatch = useDispatch();
    const [open,setOpen] = useState(false); 
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const user = useSelector(state => state?.user);
  
    const {quantity,totalPrice ,productList, loading, appErr, serverErr } = user;

    console.log("product list :",productList);

    const sayi = 1;
  
    useEffect(() => {
      dispatch(getAllProductFromBasket(""));
      dispatch(getTotalPriceFromBasket());
      dispatch(getQuantityFromBasket());
    }, []); 

    const deleteProductFromBasket = ()=>{
        dispatch(userDeleteProductFromBasket());
      };
    
     const addProductToBasket = ()=>{
         dispatch(userAddProductToBasket());
      };


  return (
    <AppBar position='stick'>
        <Toolbar sx={{background:"#5d3ebc",display:"flex",justifyContent:{lg:"flex-start",md:"flex-start",sm:"space-between",xs:"space-between"}}}>
            <Stack sx={{display:{lg:"none",md:"none",sm:"block",xs:"block"}}}>
                <MenuIcon/>
            </Stack>
            <Stack direction="row" sx={{marginLeft:"2.4rem",margin:2}}>
                <Typography sx={{fontSize:"32px",color:"#ffd404",cursor:"pointer",marginLeft:{xs:"6rem"}}}>getirmeyenin</Typography>
            </Stack>
            <Box sx={{marginLeft:{lg:"13rem",md:"10rem",sm:"8rem"},display:{lg:"flex",md:"flex",sm:"none",xs:"none"}}}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,height:"40px" }}
                >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    placeholder="Ürün ara"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="submit" sx={{ p: '10px',marginLeft:"auto" }} aria-label="search">
                    <CottageIcon sx={{color:"orange",fontSize:"20px"}} />
                    <Typography sx={{marginLeft:"0.7em",fontSize:"14px",fontWeight:"bold"}}>
                        Ev
                    </Typography>
                    <ArrowForwardIosIcon sx={{fontSize:"18px",fontWeight:"bold",marginLeft:"0.5em"}} />
                </IconButton>
            </Paper>
            </Box>
            <Stack direction="row" sx={{marginLeft:"auto",width:"30px",height:"30px",background:"white",justifyContent:"center",textAlign:"center",borderRadius:"3px"}}>
                <ShoppingBasketIcon onClick={handleOpen} color="secondary" sx={{border:"5px solid #f4f4f4",cursor:"pointer"}} />
            </Stack>
            <Box sx={{width:"80px",background:"#f2f0fe",marginLeft:"0.15em",display:"flex",justifyContent:"center",marginTop:"0.25em",textAlign:"center"}}>
                <Typography onClick={handleOpen} color="secondary" sx={{fontWeight:"bold",height:"30px",fontSize:"20px",marginTop:"0.2em",cursor:"pointer"}}>₺{totalPrice}</Typography>
            </Box>
            <Stack sx={{display:{lg:"none",md:"none",sm:"block",xs:"block"}}}>
                
            </Stack>
            <Menu

            sx={{marginTop:"108px"}}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            onClose={e =>setOpen(false)}
            open={open}
            anchorOrigin={{
            vertical: "top",
            horizontal: "right",
            }}
            transformOrigin={{
            vertical: "top",
            horizontal: "right",
            }}
            >
        {productList?.map((product)=>(
                    <MenuItem sx={{width:"400px",display:"flex",justifyContent:"space-between"}}>
                    <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                        <Box sx={{marginTop:"0.2em"}}>
                            <Typography sx={{marginRight:"1em",fontWeight:"100"}}>{product.title}</Typography>
                            <Box sx={{display:"flex",justifyContent:"flex-start"}}>
                            <Typography color="secondary" sx={{fontWeight:"bold"}}>₺{product.price}</Typography>
                            </Box>
                        </Box>
                        <Stack direction="row" sx={{marginTop:"0.2em",marginLeft:""}}>
                            <DeleteIcon color="secondary" sx={{border:"5px solid #f4f4f4"}} onClick={()=>deleteProductFromBasket()} />
                            <Typography sx={{marginTop:"0.3em",marginLeft:"0.1em",marginRight:"0.1em"}}>1</Typography>
                            <AddIcon color="secondary" sx={{border:"5px solid #f4f4f4"}} onClick={()=>{addProductToBasket()}} />
                        </Stack>
                    </Box>
                </MenuItem>

        ))}
</Menu>
        </Toolbar>
    </AppBar>
  )
}

export default BottomNavbar;
//