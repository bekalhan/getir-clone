const express = require('express');
const userRoutes = express.Router();
const {userRegisterCtrl,userLoginCtrl, userAddBasket,userDeleteProductFromBasket,getAllProductFromBasket,getAllUsers
    ,getSingleUser,deleteUser,getTotalPriceFromBasket,getProductQuantityFromBasket,createNewAdressBelongUser,getAllAdressBelongUser
    ,addFavouriteProduct,deleteFavouriteProduct,getAllFavouritesProduct,deleteAdressFromUser
} = require('../../controller/User/userCtrl');
const authmiddleware = require('../../middlewares/auth/authMiddleWare');


//post request
userRoutes.post("/api/users/register",userRegisterCtrl); 
userRoutes.post("/api/users/login",userLoginCtrl);
userRoutes.post("/api/users/add-basket/:id",authmiddleware,userAddBasket);
userRoutes.post("/api/users/add-adress/:id",authmiddleware,createNewAdressBelongUser);
userRoutes.post("/api/users/like-product/:id",authmiddleware,addFavouriteProduct);
userRoutes.post("/api/users/rlike-product/:id",authmiddleware,deleteFavouriteProduct);
userRoutes.post('/api/users/delete-adress/:id',authmiddleware,deleteAdressFromUser);

//delete request
userRoutes.post("/api/users/delete-product/:id",authmiddleware,userDeleteProductFromBasket);
userRoutes.delete("/api/users",authmiddleware,deleteUser);

//get request
userRoutes.get("/api/users/allproducts/:id",authmiddleware,getAllProductFromBasket);
userRoutes.get("/api/users/totalprice/:id",authmiddleware,getTotalPriceFromBasket);
userRoutes.get('/api/users',authmiddleware,getAllUsers);
userRoutes.get("/api/users/:id",authmiddleware,getSingleUser);
userRoutes.get("/api/users/quantity/:id",authmiddleware,getProductQuantityFromBasket);
userRoutes.get("/api/users/alladress/:id",authmiddleware,getAllAdressBelongUser)
userRoutes.get("/api/users/allfavourite/:id",authmiddleware,getAllFavouritesProduct);





module.exports = userRoutes;