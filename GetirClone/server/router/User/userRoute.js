const express = require('express');
const userRoutes = express.Router();
const {userRegisterCtrl,userLoginCtrl, userAddBasket,userDeleteProductFromBasket,getAllProductFromBasket,getAllUsers
    ,getSingleUser,deleteUser,getTotalPriceFromBasket,getProductQuantityFromBasket
} = require('../../controller/User/userCtrl');
const authmiddleware = require('../../middlewares/auth/authMiddleWare');


//post request
userRoutes.post("/api/users/register",userRegisterCtrl); 
userRoutes.post("/api/users/login",userLoginCtrl);
userRoutes.post("/api/users/add-basket/:id",userAddBasket);

//delete request
userRoutes.delete("/api/users/delete-product/:id",userDeleteProductFromBasket);
userRoutes.delete("/api/users",deleteUser);

//get request
userRoutes.get("/api/users/allproducts/:id",getAllProductFromBasket);
userRoutes.get("/api/users/totalprice/:id",getTotalPriceFromBasket);
userRoutes.get('/api/users',getAllUsers);
userRoutes.get("/api/users/:id",getSingleUser);
userRoutes.get("/api/users/quantity/:id",getProductQuantityFromBasket);





module.exports = userRoutes;