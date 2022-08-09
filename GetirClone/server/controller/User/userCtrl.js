const User = require('../../model/User/userSchema');
const Basket = require('../../model/Basket/basketSchema');
const Product = require('../../model/Product/Product');
const Adress = require('../../model/Adress/Adress');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../config/token/generateToken');

const userRegisterCtrl = expressAsyncHandler(async (req,res)=>{
    //check if user exist
    const userExist = await User.findOne({email : req?.body?.email});

    if(userExist) throw new Error("User already exist");
    try{
    const user = await User.create({
        fullName : req?.body?.fullName,
        email : req?.body?.email,
        phoneNumber : req?.body?.phoneNumber,
    });
    const userBasket = await Basket.create({
        user:user._id.toString(),
        quantity:0
    });
    user.myBasket = userBasket._id.toString();
    user.save();
    res.json(user);
    }catch(err){
        res.json(err);
    }
});

const userLoginCtrl = expressAsyncHandler(async (req,res)=>{
    try{
    const {email,phoneNumber} = req.body;
    const userFound = await User.findOne({email});
    if(userFound.isBlocked) return new Error("Access denied  you have been blocked");
    if(userFound && (await userFound.matchPhoneNumber(phoneNumber))){
        res.json({
            _id : userFound?._id,
            fullName:req?.body?.fullName,
            email : userFound?.email,
            isAdmin : userFound.isAdmin,
            token :generateToken(userFound?._id),
        });
    }else{
        res.status(401);
        throw new Error("invalid credentials")

    }
}catch(err){
     throw new Error("Invalid credentials");
}
});

const userAddBasket = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    const {product} = req.body;
    const user = await User.findById(id);
    const findProduct = await Product.findById(product);
    const userBasketId = user.myBasket.toString();
    const findBasket = await Basket.findById(userBasketId);
    try{
           const basketTotal = findBasket.totalPrice; 
            let quantity = findBasket.quantity;
            const productPrice = findProduct.price;
            let total = basketTotal + productPrice;
            quantity +=1;
            const basket = await Basket.findByIdAndUpdate(userBasketId,{
                 $push : {product :findProduct},
                 totalPrice : total,
                 quantity
             },{new:true});
        res.json(basket);
    }catch(error){
        res.json(error);
    }
});

const userDeleteProductFromBasket = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    console.log("delete",req.body)
    const {product} = req.body;
    const user = await User.findById(id);
    const findProduct = await Product.findById(product);
    const userBasketId = user.myBasket.toString();
    const findBasket = await Basket.findById(userBasketId);
    try{
        const basketTotal = findBasket.totalPrice; 
        const productPrice = findProduct.price;
        let total = basketTotal - productPrice;
        
        if(total<0) throw new Error("This event has been blocked");

        let quantity = findBasket.quantity;
        quantity = quantity -1;

        await Basket.findByIdAndUpdate(userBasketId,{
            $pull : {product:findProduct},
            totalPrice:total,
            quantity:quantity
        },{new:true});

        res.json("You are successfully deleted this product from basket");
    }catch(error){
        res.json(error);
    }
});

const getAllProductFromBasket = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    const userBasketId = user.myBasket.toString();
    const findBasket = await Basket.findById(userBasketId);

    try{
        const allproducts = findBasket.product;
        res.json(allproducts);
    }catch(error){
        res.json(error);
    }

});

const getAllUsers = expressAsyncHandler(async (req,res)=>{
    try{
        const users = await User.find({});
        res.json(users);
    }catch(err){
        res.json(err);
    }
});

const getSingleUser = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        res.json(user);
    }catch(err){
        res.json(err);
    }

});

const deleteUser = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const deleteduser = await User.findByIdAndDelete(id);
        res.json(deleteduser);
    }catch(err){
        res.json(err);
    }
});

const getTotalPriceFromBasket = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    const userBasketId = user.myBasket.toString();
    const findBasket = await Basket.findById(userBasketId);

    try{
        const totalprice = findBasket.totalPrice;
        res.json(totalprice);
    }catch(error){
        res.json(error);
    }
});

const getProductQuantityFromBasket = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    const userBasketId = user.myBasket.toString();
    const findBasket = await Basket.findById(userBasketId);

    try{
        const quantity = findBasket.quantity;
        res.json(quantity);
    }catch(error){
        res.json(error);
    }
});

const createNewAdressBelongUser = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {title,description} = req.body;
    
    try{
        const newAdress = await Adress.create({
            title,
            description
        });

        const user = await User.findByIdAndUpdate(id,{
            $push : {adress:newAdress},
        },{new:true});

        res.json(user);
        
    }catch(error){
        res.json(error);
    }
});

const deleteAdressFromUser =expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {adress} = req.body;
    
    try{
        const findAdress = await Adress.findById(adress);
        const user = await User.findByIdAndUpdate(id,{
            $pull : {adress:findAdress},
        },{new:true});

        res.json(user);
        
    }catch(error){
        res.json(error);
    }
})

const getAllAdressBelongUser = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);

    try{
        const allAdress = user.adress;
        res.json(allAdress);
    }catch(error){
        res.json(error);
    }

})

const addFavouriteProduct = expressAsyncHandler(async (req,res)=>{
    console.log("add favo");
    const {id} = req.params;
    const {product} = req.body;
    let user;

    try{
        const findProduct = await Product.findById(product);
        const findUser = await User.findById(id);
        await Product.findByIdAndUpdate(product,{
            isLiked : true
        },{new:true});
         user = await User.findByIdAndUpdate(id,{
            $push :{favouriteProduct:findProduct}
        },{new:true});
        res.json(user);
    }catch(error){
        res.json(error);
    }
});

const deleteFavouriteProduct = expressAsyncHandler(async (req,res)=>{
    console.log("delete favo");
    const {id} = req.params;
    const {product} = req.body;
    console.log(product);

    try{
        const findProduct = await Product.findById(product);
        await Product.findByIdAndUpdate(product,{
            isLiked:false
        },{new:true});
        const user = await User.findByIdAndUpdate(id,{
            $pull :{favouriteProduct:findProduct}
        },{new:true});
        res.json(user);
    }catch(error){
        res.json(error);
    }
});

const getAllFavouritesProduct = expressAsyncHandler(async (req,res)=>{
    const {id}  = req.params;
    const findUser = await User.findById(id);
    try{
        const allfavourite = findUser.favouriteProduct;
        res.json(allfavourite);
    }catch(error){
        res.json(error);
    }
}); 


module.exports = {userRegisterCtrl,userLoginCtrl,userAddBasket,userDeleteProductFromBasket,getAllProductFromBasket,getAllUsers,getSingleUser,deleteUser,getTotalPriceFromBasket,getProductQuantityFromBasket
    ,createNewAdressBelongUser,getAllAdressBelongUser,addFavouriteProduct,deleteFavouriteProduct,getAllFavouritesProduct,deleteAdressFromUser
};
