const express = require('express');
const userRoutes = express.Router();
const {userRegisterCtrl,userLoginCtrl, userAddBasket,userDeleteProductFromBasket,getAllProductFromBasket,getAllUsers
    ,getSingleUser,deleteUser,getTotalPriceFromBasket,getProductQuantityFromBasket,createNewAdressBelongUser,getAllAdressBelongUser
    ,addFavouriteProduct,deleteFavouriteProduct,getAllFavouritesProduct
} = require('../../controller/User/userCtrl');
const authmiddleware = require('../../middlewares/auth/authMiddleWare');


//post request
userRoutes.post("/api/users/register",userRegisterCtrl); 
userRoutes.post("/api/users/login",userLoginCtrl);
userRoutes.post("/api/users/add-basket/:id",userAddBasket);
userRoutes.post("/api/users/add-adress/:id",createNewAdressBelongUser);
userRoutes.post("/api/users/like-product/:id",addFavouriteProduct);
userRoutes.post("/api/users/rlike-product/:id",deleteFavouriteProduct);

//delete request
userRoutes.post("/api/users/delete-product/:id",userDeleteProductFromBasket);
userRoutes.delete("/api/users",deleteUser);

//get request
userRoutes.get("/api/users/allproducts/:id",getAllProductFromBasket);
userRoutes.get("/api/users/totalprice/:id",getTotalPriceFromBasket);
userRoutes.get('/api/users',getAllUsers);
userRoutes.get("/api/users/:id",getSingleUser);
userRoutes.get("/api/users/quantity/:id",getProductQuantityFromBasket);
userRoutes.get("/api/users/alladress/:id",getAllAdressBelongUser)
userRoutes.get("/api/users/allfavourite/:id",getAllFavouritesProduct);





module.exports = userRoutes;