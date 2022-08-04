const Product = require('../../model/Product/Product');
const expressAsyncHandler = require('express-async-handler');
const fs = require('fs');
const {PhotoUpload,postPhotoResize} = require('../../middlewares/upload/PhotoUpload');
const cloudinaryUploadImg = require('../../utils/cloudinary');




const createProductCtrl = expressAsyncHandler(async (req,res)=>{
    const {title, description,category,price} = req.body;
   const localpath =  `public/images/product/${req.file.filename}`;
   const imageUploaded = await cloudinaryUploadImg(localpath);

   // imageUploaded.url
    
    try{
        const product = await Product.create({title,description,category,price,image:imageUploaded?.url});
        res.json(product);
    }catch(error){
        res.json(error);
    }
});

const fetchAllProduct = expressAsyncHandler(async (req,res)=>{
    try{
        const products = await Product.find({});
        console.log(products);
    }catch(error){  
        res.json(error);
    }
});

const fetchSingleProduct = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const product = await Product.findById(id);
        res.json(product);
    }catch(error){
        res.json(error);
    }
});

const fetchProductBelongCategory = expressAsyncHandler(async (req,res)=>{
    const category = req.query.category;
    try{
        const filterProduct = await Product.find({category});
        res.json(filterProduct);
    }catch(error){
        res.json(error);
    }
});

const deleteProduct = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const product = await Product.findByIdAndDelete(id);
        res.json(product);
    }catch(error){
        res.json(error);
    }
});

const updateProduct = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    const {title,description,category,price} = req.body;
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,{
            title,
            description,
            category,
            price
        });
        res.json(updateProduct);
    }catch(error){
        res.json(error);
    }
});





module.exports = {createProductCtrl,fetchAllProduct,fetchSingleProduct,fetchProductBelongCategory,deleteProduct,updateProduct};

