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
                `${baseUrl}/api/users/add-basket/62f21445f2853aa4a664a39d`,
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
                `${baseUrl}/api/users/allproducts/62f21445f2853aa4a664a39d`,
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
                `${baseUrl}/api/users/totalprice/62f21445f2853aa4a664a39d`,
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
              `${baseUrl}/api/users/quantity/62f21445f2853aa4a664a39d`,
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
      try{
          const { data } = await axios.post(
              `${baseUrl}/api/users/delete-product/62f21445f2853aa4a664a39d`,
              { product } ,
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

export const userGetAllAdresses = createAsyncThunk(
  "get/adress",
  async (adress,{ rejectWithValue, getState, dispatch})=>{
    try{
      const {data} = await axios.get(
        `${baseUrl}/api/users/alladress/62f21445f2853aa4a664a39d`
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

export const userAddAdress = createAsyncThunk(
  "create/adress",
  async (adress,{ rejectWithValue, getState, dispatch})=>{
    try{
      const {data} = await axios.post(
        ` ${baseUrl}/api/users/add-adress/62f21445f2853aa4a664a39d`,
        {
           title : adress.title,
           description : adress.description
        }
      )
      return data;
    }catch(error){
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteAdressFromUser = createAsyncThunk(
  "delete/adress",
  async (adress,{ rejectWithValue, getState, dispatch})=>{
    try{
      console.log("ad slices :",adress);
      const {data} = await axios.post(
        `${baseUrl}/api/users/delete-adress/62f21445f2853aa4a664a39d`,
        {adress}
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

export const likeProduct = createAsyncThunk(
  "like/product",
  async (product,{ rejectWithValue, getState, dispatch})=>{
    try{
      const {data} = await axios.post(
        `${baseUrl}/api/users/like-product/62f21445f2853aa4a664a39d`,
        {product}
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

export const DislikeProduct = createAsyncThunk(
  "dislike/product",
  async (product,{ rejectWithValue, getState, dispatch})=>{
    console.log("dlike slices");
    try{
      const {data} = await axios.post(
        `${baseUrl}/api/users/rlike-product/62f21445f2853aa4a664a39d`,
        {product}
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

export const getAllLikedProducts = createAsyncThunk(
  "get/likeproduct",
  async (product,{ rejectWithValue, getState, dispatch})=>{
    try{
      const {data} = await axios.get(
        `${baseUrl}/api/users/allfavourite/62f21445f2853aa4a664a39d`,
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
                //get all adress
                builder.addCase(userGetAllAdresses.pending, (state, action) => {
                  state.loading = true;
                });
                builder.addCase(userGetAllAdresses.fulfilled, (state, action) => {
                  state.adressList = action?.payload;
                  state.isCreated = false;
                  state.loading = false;
                  state.appErr = undefined;
                  state.serverErr = undefined;
                });
                builder.addCase(userGetAllAdresses.rejected, (state, action) => {
                  state.loading = false;
                  state.appErr = action?.payload?.message;
                  state.serverErr = action?.error?.message;
                });
                 //add adress
                builder.addCase(userAddAdress.pending, (state, action) => {
                  state.loading = true;
                });
                builder.addCase(userAddAdress.fulfilled, (state, action) => {
                  state.newAdress = action?.payload;
                  state.isCreated = false;
                  state.loading = false;
                  state.appErr = undefined;
                  state.serverErr = undefined;
                });
                builder.addCase(userAddAdress.rejected, (state, action) => {
                  state.loading = false;
                  state.appErr = action?.payload?.message;
                  state.serverErr = action?.error?.message;
                });
                 //delete adress
                builder.addCase(deleteAdressFromUser.pending, (state, action) => {
                  state.loading = true;
                });
                builder.addCase(deleteAdressFromUser.fulfilled, (state, action) => {
                  state.deletedAdress = action?.payload;
                  state.isCreated = false;
                  state.loading = false;
                  state.appErr = undefined;
                  state.serverErr = undefined;
                });
                builder.addCase(deleteAdressFromUser.rejected, (state, action) => {
                  state.loading = false;
                  state.appErr = action?.payload?.message;
                  state.serverErr = action?.error?.message;
                });
                // like product
                builder.addCase(likeProduct.pending, (state, action) => {
                  state.loading = true;
                });
                builder.addCase(likeProduct.fulfilled, (state, action) => {
                  state.likeProduct = action?.payload;
                  state.isCreated = false;
                  state.loading = false;
                  state.appErr = undefined;
                  state.serverErr = undefined;
                });
                builder.addCase(likeProduct.rejected, (state, action) => {
                  state.loading = false;
                  state.appErr = action?.payload?.message;
                  state.serverErr = action?.error?.message;
                });
                 // dislike product
                builder.addCase(DislikeProduct.pending, (state, action) => {
                  state.loading = true;
                });
                builder.addCase(DislikeProduct.fulfilled, (state, action) => {
                  state.DislikeProduct = action?.payload;
                  state.isCreated = false;
                  state.loading = false;
                  state.appErr = undefined;
                  state.serverErr = undefined;
                });
                builder.addCase(DislikeProduct.rejected, (state, action) => {
                  state.loading = false;
                  state.appErr = action?.payload?.message;
                  state.serverErr = action?.error?.message;
                });
                // favourite products
                builder.addCase(getAllLikedProducts.pending, (state, action) => {
                  state.loading = true;
                });
                builder.addCase(getAllLikedProducts.fulfilled, (state, action) => {
                  state.likedProducts = action?.payload;
                  state.isCreated = false;
                  state.loading = false;
                  state.appErr = undefined;
                  state.serverErr = undefined;
                });
                builder.addCase(getAllLikedProducts.rejected, (state, action) => {
                  state.loading = false;
                  state.appErr = action?.payload?.message;
                  state.serverErr = action?.error?.message;
                });
    }
});

export default userSlices.reducer;
