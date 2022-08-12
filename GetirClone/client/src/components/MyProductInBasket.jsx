import React,{useState} from 'react';
import {Avatar, Box, Stack, Typography,MenuItem,FormControl,Select,InputLabel, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {getAllProductFromBasket,getTotalPriceFromBasket,getQuantityFromBasket,userDeleteProductFromBasket,userAddProductToBasket,userGetAllAdresses} from '../redux/slices/User/userSlices';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdressDropDown from './AdressDropDown';

const formSchema = Yup.object({
    adress: Yup.object().required("adress is required"),
  });


function MyProductInBasket() {
    const [value,setValue] = useState('');

    const dispatch = useDispatch();

  const user = useSelector(state => state?.user);

  const {quantity,totalPrice ,productList, loading, appErr,adressList, serverErr } = user;

  const formik = useFormik({
    initialValues: {
      adress: "",
    },
    onSubmit: values => {
      //dispath the action
      const data = {
        adress: values?.adress?.label,
      };
      console.log(data);
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    dispatch(getAllProductFromBasket());
    dispatch(getTotalPriceFromBasket());
    dispatch(userGetAllAdresses());
  }, []); 

  const deleteProductFromBasket = (id)=>{
    dispatch(userDeleteProductFromBasket(id));
  };

  const addProductToBasket = (id)=>{
    dispatch(userAddProductToBasket(id));
  };

  const alladresses = adressList?.map((adress)=>{
    return {
        label: adress?.description,
        value: adress?._id,
      };
  });

    //handleChange
    const handleChange = value => {
        console.log("selam");
        setValue(value);
      };

  console.log("adress list :",adressList);
  console.log("adress :",value);

  return (
    <Box sx={{display: 'flex',justifyContent: 'center',marginTop:"3rem"}}>
        <Stack direction="row" sx={{width:"80%",display:"flex",justifyContent:"center"}}>
            <Box flex={3} sx={{background:"#fefefe"}}>
                    <Stack direction="row" sx={{display:"flex",justifyContent:"space-between"}}>
                        <Typography sx={{fontWeight:"100"}}>Sepetim</Typography>
                        <Stack direction="row" sx={{cursor:"pointer"}}>
                            <DeleteIcon color="secondary" sx={{fontSize:"28px"}} />
                            <Typography color="secondary" sx={{marginLeft:"0.3em",marginTop:"0.1em"}}>Sepeti Temizle</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="column">  
                    {productList?.map((product)=>(
                        <Stack direction="row" sx={{display:"flex",justifyContent:"space-between",marginTop:"2em"}}>
                        <Stack direction="row">
                            <Avatar variant="square" sx={{width:"60px",height:"60px"}} src={product.image} />
                            <Stack direction="column" sx={{marginLeft:"1em"}} >
                                <Typography sx={{fontSize:"14px"}} color="secondary">₺{product.price}</Typography>
                                <Typography sx={{fontSize:"17px"}}>{product.title}</Typography>
                                <Typography sx={{fontSize:"14px",fontWeight:"200"}}>{product.description}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row" sx={{marginLeft:"auto"}}>
                            <DeleteIcon color="secondary" sx={{border:"5px solid #f4f4f4",cursor:"pointer"}} onClick={()=>{deleteProductFromBasket(product.id)}} />
                            <Box>
                                <Typography sx={{marginTop:"0.3em",marginLeft:"0.1em",marginRight:"0.1em"}}>1</Typography>
                            </Box>
                            <AddIcon sx={{border:"5px solid #f4f4f4",cursor:"pointer"}} onClick={()=>{addProductToBasket(product.id)}} />
                        </Stack>
                    </Stack> 
                    ))}
            </Stack>
            </Box>
            <Box flex={1}  sx={{background:"#fefefe",marginLeft:"2rem"}}>
                <Stack direction="column">
                    <Typography sx={{}}>Adres</Typography>
                    <Box sx={{marginTop:"2rem"}}>
                        <form onSubmit={formik.handleSubmit}>
                            <AdressDropDown
                                value={formik.values.adress?.label}
                                onChange={formik.setFieldValue}
                                onBlur={formik.setFieldTouched}
                                error={formik.errors.adress}
                                touched={formik.touched.adress}  
                            />
                        </form>
                    </Box>
                    <Box sx={{marginTop:"2rem"}}>
                        <Typography>Sepet Toplamı</Typography>
                        <Box>
                            <Stack direction="row" sx={{display: "flex",justifyContent: "space-between",marginTop:"1em"}}>
                                <Typography sx={{marginLeft:"0.3em",fontWeight:"bold"}}>Sepet Tutarı</Typography>
                                <Typography sx={{fontWeight:"100"}}>₺{totalPrice}</Typography>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{marginTop:"2rem",display:"flex",justifyContent: "center"}}>
                        <Button variant="outlined" sx={{background:"purple",color:"white"}}>Ödemeye Geç</Button>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    </Box>
  )
}

export default MyProductInBasket