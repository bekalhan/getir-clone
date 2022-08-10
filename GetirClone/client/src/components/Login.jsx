import React from 'react'
import {Box, Typography,List, ListItem, TextField,Stack, Button} from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {registerUserAction} from '../redux/slices/User/userSlices';
import { Redirect } from "react-router-dom";
import {loginUserAction} from '../redux/slices/User/userSlices';



//Form schema
const formSchema = Yup.object({
    phoneNumber: Yup.string().required("Telefon numarası girmelisiniz"),
    email: Yup.string().required("Email girmelisiniz"),
  });

function Login() {
    const dispatch = useDispatch();

    //formik
const formik = useFormik({
  initialValues: {
    phoneNumber: "",
    email: "",
  },
  onSubmit: values => {
    //dispath the action
    dispatch(loginUserAction(values));
  },
  validationSchema: formSchema,
});

  //redirect
  const store = useSelector(state => state?.user);
  const { userAuth, loading, serverErr, appErr } = store;
  if (userAuth) return <Redirect to={`/getirmeyenin/kategoriler?category=Fırından`} />;




  return (
    <Box sx={{display: 'flex',justifyContent: 'center',textAlign:"center",marginTop:"5rem"}}>
    <Stack direction="column">
         <Box>
                <Typography variant='h5' color="secondary">Giris Yap</Typography>
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
                    <Button type="submit" sx={{background:"purple",color:"white"}}>Giris Yap</Button>
                </ListItem>
            </List>
            </form>


    </Stack>
  </Box>
  )
}

export default Login