import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from '../slices/Category/categorySlices';
import productsReducer from '../slices/Product/productSlices';
import usersReducer from '../slices/User/userSlices';

const store = configureStore({
    reducer: {
      category : categoriesReducer,
      product : productsReducer,
      user : usersReducer
    },
  });
  
  export default store;