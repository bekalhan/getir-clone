const express = require('express');
const categoryRoutes = express.Router();
const { createNewCategory ,fetchAllCategoriesCtrl,fetchCategoryCtrl,updateCategoryCtrl,deleteCategoryCtrl} = require('../../controller/Category/categoryCtrl');
const {productPhotoResize,PhotoUpload,categoryPhotoResize} = require('../../middlewares/upload/PhotoUpload');


//post request
categoryRoutes.post('/api/category/create-category',PhotoUpload.single("image"),categoryPhotoResize,createNewCategory);

//get request
categoryRoutes.get('/api/categories',fetchAllCategoriesCtrl);
categoryRoutes.get('/api/category/:id',fetchCategoryCtrl);

//delete request
categoryRoutes.delete('/api/category/:id',deleteCategoryCtrl);

//put request
categoryRoutes.put('/api/category/:id',updateCategoryCtrl);


module.exports = categoryRoutes;