import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//create category action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.post(
        `${baseUrl}/api/category/create-category`,
        {
          title: category?.title,
        },
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

//fetch category action
export const fetchCategoryAction = createAsyncThunk(
  "category/details",
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
      const { data } = await axios.get(`${baseUrl}/api/category/${id}`);
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
export const fetchCategoriesAction = createAsyncThunk(
    "category/fetch",
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
        const { data } = await axios.get(`${baseUrl}/api/categories`);
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
export const updateCategoriesAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/category/${category?.id}`,
        { title: category?.title },
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
export const deleteCategoriesAction = createAsyncThunk(
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




const categorySlices = createSlice({
  name:"category",
  initialState:{},
  extraReducers : builder =>{
    //create
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.isCreated = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch all categories
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categoryList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //update
    builder.addCase(updateCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCategoriesAction.fulfilled, (state, action) => {
      state.updateCategory = action?.payload;
      state.isEdited = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //delete
    builder.addCase(deleteCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoriesAction.fulfilled, (state, action) => {
      state.deletedCategory = action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch details
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  }
});

export default categorySlices.reducer;
  