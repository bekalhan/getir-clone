import React from 'react';
import {Box, Typography,List, ListItem, TextField,Stack, Button} from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {registerUserAction} from '../redux/slices/User/userSlices';
import { Redirect } from "react-router-dom";



//Form schema
const formSchema = Yup.object({
    phoneNumber: Yup.string().required("Telefon numarası girmelisiniz"),
    fullName: Yup.string().required("Ad Soyad girmelisiniz"),
    email: Yup.string().required("Email girmelisiniz"),
  });

function Register() {

    const dispatch = useDispatch();

      //formik
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      fullName: "",
      email: "",
    },
    onSubmit: values => {
        dispatch(registerUserAction(values));
      //dispath the action
    },
    validationSchema: formSchema,
  });

    //select state from store
    const storeData = useSelector(store => store?.user);
    const { loading, appErr, serverErr, registered } = storeData;

    if (registered) {
        return <Redirect to="/getirmeyenin/girisyap" />;
      }

  return (
      <Box sx={{display: 'flex',justifyContent: 'center',textAlign:"center",marginTop:"5rem"}}>
        <Stack direction="column">
             <Box>
                    <Typography variant='h5' color="secondary">Kayıt Ol</Typography>
                    <Box>
                    {appErr || serverErr ? (
                      <Box sx={{color:"red"}}>
                        {serverErr} {appErr}
                      </Box>
                    ) : null}
                    </Box>
            </Box>
            <form onSubmit={formik.handleSubmit}>
            <List sx={{marginTop:"2rem"}}>
                <ListItem>
                    <TextField
                       value={formik.values.phoneNumber}
                      onChange={formik.handleChange("phoneNumber")}
                      onBlur={formik.handleBlur("phoneNumber")}
                      type="phoneNumber"
                    label="Telefon numarası" sx={{width:"300px"}} />
                </ListItem>
                <Box>
                   <Typography color="secondary">
                          {formik.touched.phoneNumber && formik.errors.phoneNumber}
                    </Typography>
                </Box>

                <ListItem>
                    <TextField
                    value={formik.values.fullName}
                      onChange={formik.handleChange("fullName")}
                      onBlur={formik.handleBlur("fullName")}
                      type="fullName"
                    label="Ad Soyad" sx={{width:"300px"}} />
                </ListItem>
                <Box>
                   <Typography color="secondary">
                          {formik.touched.fullName && formik.errors.fullName}
                    </Typography>
                </Box>
                <ListItem>
                    <TextField
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      type="email"
                    label="E-posta" sx={{width:"300px"}} />
                </ListItem>
                <Box>
                   <Typography color="secondary">
                          {formik.touched.email && formik.errors.email}
                    </Typography>
                </Box>
                <ListItem sx={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
                    <Button type="submit" sx={{background:"purple",color:"white"}}>Kayıt Ol</Button>
                </ListItem>
            </List>
            </form>


        </Stack>
      </Box>
  )
}

export default Register