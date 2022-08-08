import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";


//add product to basket
export const userAddProductToBasket = createAsyncThunk(
    "add/basket",
    async (product,{ rejectWithValue, getState, dispatch})=>{
      console.log("add basket");
        try{
            const { data } = await axios.post(
                `${baseUrl}/api/users/add-basket/62f01802bb0ac47b5b7b13e6`,
                { product },
              );
              return data;
        }catch(error){
            if (!error?.response) {
                throw error;
              }
              return rejectWithValue(error?.response?.data);
        }
    }
);

//get all product from basket
export const getAllProductFromBasket = createAsyncThunk(
    "get/basket",
    async (product,{ rejectWithValue, getState, dispatch})=>{
      console.log("girdi");
        try{
            const { data } = await axios.get(
                `${baseUrl}/api/users/allproducts/62f01802bb0ac47b5b7b13e6`,
              );
              return data;
        }catch(error){
            if (!error?.response) {
                throw error;
              }
              return rejectWithValue(error?.response?.data);
        }
    }
);

export const getTotalPriceFromBasket = createAsyncThunk(
    "get/totalprice",
    async(product,{ rejectWithValue, getState, dispatch})=>{
        try{
            const { data } = await axios.get(
                `${baseUrl}/api/users/totalprice/62f01802bb0ac47b5b7b13e6`,
              );
              return data;
        }catch(error){
            if (!error?.response) {
                throw error;
              }
              return rejectWithValue(error?.response?.data);
        }
    }
);

export const getQuantityFromBasket = createAsyncThunk(
  "get/quantity",
  async(product,{ rejectWithValue, getState, dispatch})=>{
      try{
          const { data } = await axios.get(
              `${baseUrl}/api/users/quantity/62f01802bb0ac47b5b7b13e6`,
            );
            return data;
      }catch(error){
          if (!error?.response) {
              throw error;
            }
            return rejectWithValue(error?.response?.data);
      }
  }
);

export const userDeleteProductFromBasket = createAsyncThunk(
  "delete/basket",
  async (product,{ rejectWithValue, getState, dispatch})=>{
    console.log("delete basket");
      try{
        console.log("gelen product ",product);
          const { data } = await axios.post(
              `${baseUrl}/api/users/delete-product/62f01802bb0ac47b5b7b13e6`,
              { product } ,
            );
            console.log("dataa :",data);
            return data;
      }catch(error){
          if (!error?.response) {
              throw error;
            }
            return rejectWithValue(error?.response?.data);
      }
  }
);

const userSlices = createSlice({
    name:"users",
    initialState:{
        userAuth:""
    },
    extraReducers : builder =>{
    //add basket
    builder.addCase(userAddProductToBasket.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(userAddProductToBasket.fulfilled, (state, action) => {
        state.product = action?.payload;
        state.isCreated = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(userAddProductToBasket.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
          //get basket
    builder.addCase(getAllProductFromBasket.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(getAllProductFromBasket.fulfilled, (state, action) => {
        state.productList = action?.payload;
        state.isCreated = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(getAllProductFromBasket.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
                //get total price
    builder.addCase(getTotalPriceFromBasket.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(getTotalPriceFromBasket.fulfilled, (state, action) => {
        state.totalPrice = action?.payload;
        state.isCreated = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(getTotalPriceFromBasket.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
      //get quantity
      builder.addCase(getQuantityFromBasket.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(getQuantityFromBasket.fulfilled, (state, action) => {
        state.quantity = action?.payload;
        state.isCreated = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(getQuantityFromBasket.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
            //delete product
            builder.addCase(userDeleteProductFromBasket.pending, (state, action) => {
              state.loading = true;
            });
            builder.addCase(userDeleteProductFromBasket.fulfilled, (state, action) => {
              state.deleteProduct = action?.payload;
              state.isCreated = false;
              state.loading = false;
              state.appErr = undefined;
              state.serverErr = undefined;
            });
            builder.addCase(userDeleteProductFromBasket.rejected, (state, action) => {
              state.loading = false;
              state.appErr = action?.payload?.message;
              state.serverErr = action?.error?.message;
            });
    }
});

export default userSlices.reducer;
