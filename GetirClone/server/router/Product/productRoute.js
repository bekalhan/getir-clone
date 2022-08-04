const express = require('express');
const productRoutes = express.Router();
const {createProductCtrl,fetchAllProduct,fetchSingleProduct,fetchProductBelongCategory,deleteProduct,updateProduct} = require('../../controller/Product/productCtrl');
const {productPhotoResize,PhotoUpload} = require('../../middlewares/upload/PhotoUpload');
const authmiddleware = require('../../middlewares/auth/authMiddleWare');



//post request
productRoutes.post('/api/product/new-product',PhotoUpload.single("image"),productPhotoResize,createProductCtrl);

//get request
productRoutes.get('/api/products',fetchAllProduct);
productRoutes.get('/api/product/:id',fetchSingleProduct);
productRoutes.get('/api/product',fetchProductBelongCategory);

//delete request
productRoutes.delete('/api/product/:id',deleteProduct);


//put method
productRoutes.put('/api/product/:id',updateProduct)



module.exports = productRoutes;