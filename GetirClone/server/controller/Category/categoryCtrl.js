const Category = require('../../model/Category/categorySchema');
const expressAsyncHandler = require('express-async-handler');
const cloudinaryUploadImg = require('../../utils/cloudinary');
const fs = require('fs');



const createNewCategory = expressAsyncHandler(async (req,res)=>{
    const {title} = req.body;

    const localpath =  `public/images/category/${req.file.filename}`;
    const imageUploaded = await cloudinaryUploadImg(localpath);

    try{
        const newCategory = await Category.create({
            title,
            image:imageUploaded?.url
        });
        res.json(newCategory);
    }catch(error){
        res.json(error);
    }
});


const fetchAllCategoriesCtrl = expressAsyncHandler(async (req,res)=>{
    console.log("enter");
    try{
        const categories = await Category.find({});
        res.json(categories);
    }catch(err){
        res.json(err);
    }
});

const fetchCategoryCtrl = expressAsyncHandler(async (req,res) =>{
    const {id} = req.params;
    try{
        const categories = await Category.findById(id).sort("-createdAt");
        res.json(categories);
    }catch(err){
        res.json(err);
    }
});

const updateCategoryCtrl = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const category = await Category.findByIdAndUpdate(id,{
            title : req?.body?.title
        },{new : true,runValidators : true})
        res.json(category);
    }catch(err){
        res.json(err);
    }
})

//delete
const deleteCategoryCtrl = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const category = await Category.findByIdAndDelete(id);
        res.json(category);
    }catch(err){
        res.json(err);
    }
});


module.exports = {createNewCategory,fetchAllCategoriesCtrl,fetchCategoryCtrl,updateCategoryCtrl,deleteCategoryCtrl};