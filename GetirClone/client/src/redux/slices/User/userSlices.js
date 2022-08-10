import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    console.log("register enter");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      );
      //save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//add product to basket
export const userAddProductToBasket = createAsyncThunk(
    "add/basket",
    async (product,{ rejectWithValue, getState, dispatch})=>{
      const user = getState()?.user;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
        try{
            const { data } = await axios.post(
                `${baseUrl}/api/users/add-basket/${userAuth?._id}`,
                { product },
                config
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
      const user = getState()?.user;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
        try{
            const { data } = await axios.get(
                `${baseUrl}/api/users/allproducts/${userAuth?._id}`,
                config
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
      const user = getState()?.user;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
        try{
            const { data } = await axios.get(
                `${baseUrl}/api/users/totalprice/${userAuth?._id}`,
                config
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
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
      try{
          const { data } = await axios.get(
              `${baseUrl}/api/users/quantity/${userAuth?._id}`,
              config
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
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
      try{
          const { data } = await axios.post(
              `${baseUrl}/api/users/delete-product/${userAuth?._id}`,
              { product } ,
              config
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
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try{
      const {data} = await axios.get(
        `${baseUrl}/api/users/alladress/${userAuth?._id}`,
        config
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
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try{
      const {data} = await axios.post(
        ` ${baseUrl}/api/users/add-adress/${userAuth?._id}`,
        {
           title : adress.title,
           description : adress.description
        },
        config
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
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try{
      console.log("ad slices :",adress);
      const {data} = await axios.post(
        `${baseUrl}/api/users/delete-adress/${userAuth?._id}`,
        {adress},
        config
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
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try{
      const {data} = await axios.post(
        `${baseUrl}/api/users/like-product/${userAuth?._id}`,
        {product},
        config
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
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try{
      const {data} = await axios.post(
        `${baseUrl}/api/users/rlike-product/${userAuth?._id}`,
        {product},
        config
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
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try{
      const {data} = await axios.get(
        `${baseUrl}/api/users/allfavourite/${userAuth?._id}`,
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

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;



const userSlices = createSlice({
    name:"users",
    initialState:{
        userAuth:userLoginFromStorage
    },
    extraReducers : builder =>{
       //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
        //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
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
