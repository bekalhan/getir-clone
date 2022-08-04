import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//create product action
export const createProductAction = createAsyncThunk(
    "product/create",
    async (product,{rejectWithValue, getState, dispatch})=>{
        try{
            const {data} = await axios.post(
                `${baseUrl}/product/new-product`,
                {
                    title:product?.title,
                    description:product?.description,
                    category:product?.category,
                    price:product?.price,
                }
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

//fetch category action
export const fetchProductAction = createAsyncThunk(
    "product/details",
    async (id, { rejectWithValue, getState, dispatch }) => {
      //get user token
    /*  const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };*/
      //http call
      try {
        const { data } = await axios.get(`${baseUrl}/api/product/${id}`);
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
);

//fetch all category action
export const fetchProductsAction = createAsyncThunk(
      "product/fetch",
      async (category, { rejectWithValue, getState, dispatch }) => {
        //get user token
       /* const user = getState()?.users;
        const { userAuth } = user;
        const config = {
          headers: {
            Authorization: `Bearer ${userAuth?.token}`,
          },
        };*/
        //http call
        try {
          const { data } = await axios.get(`${baseUrl}/api/products`);
          return data;
        } catch (error) {
          if (!error?.response) {
            throw error;
          }
          return rejectWithValue(error?.response?.data);
        }
      }
);

//Update
export const updateProductAction = createAsyncThunk(
    "product/update",
    async (product, { rejectWithValue, getState, dispatch }) => {
      //get user token
      /*const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };*/
      //http call
      try {
        const { data } = await axios.put(
          `${baseUrl}/api/product/${product?.id}`,
          { title: product?.title },
        );
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
//delete
export const deleteProductAction = createAsyncThunk(
    "category/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
      //get user token
     /* const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };*/
      //http call
      try {
        const { data } = await axios.delete(
          `${baseUrl}/api/category/${id}`
        );
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
);

//getProductBelongCategory
export const getProductBelongCategory= createAsyncThunk(
    "category/belong-category",
    async (category,{rejectWithValue,getState,dispatch}) =>{
        try{
          console.log("gelen category slices :",category);
            const {data} = await axios.get(`${baseUrl}/api/product?category=${category}`);
            return data;
        } catch(error){
            if (!error?.response) {
                throw error;
              }
              return rejectWithValue(error?.response?.data);
        }
    }
);



//fetch products action

const productSlices = createSlice({
    name:"product",
    initialState:{
      category:"all"
    },
    extraReducers:builder=>{
         //create
    builder.addCase(createProductAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(createProductAction.fulfilled, (state, action) => {
        state.product = action?.payload;
        state.isCreated = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(createProductAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
       //fetch all categories
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.productList = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchProductsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
      //fetch only one
      builder.addCase(fetchProductAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchProductAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
       //update
    builder.addCase(updateProductAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(updateProductAction.fulfilled, (state, action) => {
        state.updateProduct = action?.payload;
        state.isEdited = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(updateProductAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  
      //delete
      builder.addCase(deleteProductAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(deleteProductAction.fulfilled, (state, action) => {
        state.deletedProduct = action?.payload;
        state.isDeleted = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deleteProductAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
      //fetch productbelongcategory
      builder.addCase(getProductBelongCategory.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(getProductBelongCategory.fulfilled, (state, action) => {
        state.productsbelongcategory = action?.payload;
        state.isDeleted = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(getProductBelongCategory.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });


    }
});


export default productSlices.reducer;
