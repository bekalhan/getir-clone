import React from 'react';
import {userGetAllAdresses} from '../redux/slices/User/userSlices';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box } from '@mui/system';
import Select from "react-select";


function AdressDropDown(props) {
    console.log("pr : ",props);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userGetAllAdresses());
      }, []); 

    const user = useSelector(state => state?.user);
    const { adressList } = user;

    const alladresses = adressList?.map((adress)=>{
        return {
            label: adress?.description,
            value: adress?._id,
          };
      });

//handleChange
  const handleChange = value => {
    props.onChange("adress", value);
  };
  //handleBlur
  const handleBlur = () => {
    props.onBlur("adress", true);
  };

  return (
    <Box>
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id="adress"
          options={alladresses}
          value={props?.value?.label}
        />
    </Box>
  )
}

export default AdressDropDown