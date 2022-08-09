import { Stack ,Box, List, ListItem, ListItemButton, Typography,Modal,TextField, Button} from '@mui/material'
import React,{useState} from 'react';
import Navigate from './navigate';
import CottageIcon from '@mui/icons-material/Cottage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {userGetAllAdresses,userAddAdress,deleteAdressFromUser} from '../redux/slices/User/userSlices';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from 'react-router-dom';

const formSchema = Yup.object({
    title: Yup.string().required("Adres başlığı girmelisiniz"),
    description: Yup.string().required("Adres Açıklaması girmelisiniz"),
  });





function MyAdress() {

    const [open,setOpen] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 100,
        p: 4,
      };

    const dispatch = useDispatch();

    const deleteAdress = (id)=>{
        dispatch(deleteAdressFromUser(id));
    }

    const formik = useFormik({
        initialValues: {
          title: "",
          description: "",
        },
        onSubmit: values => {
          //dispath the action
          dispatch(userAddAdress(values))
        },
        validationSchema: formSchema,
      });

    const user = useSelector(store=>store?.user);
    const {adressList,newAdress,deletedAdress, loading, appErr, serverErr } = user;


    useEffect(()=>{
        dispatch(userGetAllAdresses());
    },[]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if(newAdress){
       setInterval(function(){
        window.location.reload(false);
        },1000);
    }

    if(deletedAdress){
        setInterval(function(){
            window.location.reload(false);
            },1000);
    }


  return (
    <Stack direction="row">
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <List>
                <form onSubmit={formik.handleSubmit}>
                <ListItem>
                    <Typography sx={{color:"red"}}>{appErr || serverErr ? (
                      <div className="text-red-400">
                        {serverErr} {appErr}
                      </div>
                    ) : null}</Typography>
                </ListItem>
                <ListItem>
                    <Typography sx={{fontWeight: '100'}}>Adres Başlığı</Typography>
                    <TextField 
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    type="title"
                    sx={{width:"300px",marginLeft:"2em"}} size="small" />
                </ListItem>
                <Box sx={{display:"flex",justifyContent:"center",marginTop:"1em",color:"red"}}>
                    <Typography>
                      {formik.touched.title && formik.errors.title}
                    </Typography>
                </Box>
                <ListItem>
                    <Typography sx={{fontWeight: '100'}}>Adres</Typography>
                    <TextField
                        value={formik.values.description}
                        onChange={formik.handleChange("description")}
                        onBlur={formik.handleBlur("description")}
                        type="description"
                        id="standard-multiline-static"
                        label="Adresiniz"
                        multiline
                        rows={4}
                        variant="standard"
                        sx={{width:"300px",marginLeft:"5em",border:"5px solid #fefefe"}}
                        />
                </ListItem>
                <Box sx={{display:"flex",justifyContent:"center",marginTop:"1em",color:"red"}}>
                    <Typography>
                      {formik.touched.description && formik.errors.description}
                    </Typography>
                </Box>
                <ListItem sx={{display:"flex",justifyContent:"center"}}>
                        <Button type="submit" variant="outlined" sx={{width:"80%",marginTop:"3em"}}>Adres Ekle</Button>
                </ListItem>
                </form>
            </List>
        </Box>
      </Modal>

        <Navigate />
        <Box flex={6}  sx={{background:"white",marginLeft:"2rem",marginRight:"22rem",marginTop:"2rem"}}>
            <Typography>Adreslerim</Typography>
                <List>
                    {adressList?.map((adress)=>(
                         <ListItem>
                        <ListItemButton>
                            <ListItemButton>
                                    <CottageIcon color="secondary" />
                                    <Typography sx={{marginLeft:"1em"}}>{adress.title}</Typography>
                                    <Typography sx={{marginLeft:"3em",fontWeight:"100"}}>{adress.description}</Typography>
                                    <DeleteIcon color="secondary" sx={{marginLeft:"auto",fontSize:"32px"}} onClick={()=>{deleteAdress(adress._id)}} />
                            </ListItemButton>
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                <Box sx={{marginTop:"2rem",fontWeight:"100"}}>
                    <Typography>Adres Ekle</Typography>
                    <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemButton onClick={handleOpen}>
                                    <CottageIcon sx={{color:"red"}} />
                                    <Typography sx={{marginLeft:"3em",fontWeight:"100"}}>Ev Adresi Ekle</Typography>
                                    <AddIcon color="secondary" sx={{marginLeft:"2em",fontSize:"32px",marginLeft:"auto"}} />
                            </ListItemButton>
                        </ListItemButton>
                    </ListItem>
                    </List>
                </Box>
        </Box>
    </Stack>
  )
}

export default MyAdress