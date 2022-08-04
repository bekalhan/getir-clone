
const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEYS,
    api_secret:process.env.CLOUDINARY_SECRET_KEYS
});


const cloudinaryUploadImg = async (fileToUpload)=>{
    try{
        const data = await cloudinary.uploader.upload(fileToUpload,{
            resource_type:"auto"
        });
        return {
            url : data?.secure_url
        }
    }catch(err){
        return err;
    }
}

module.exports  = cloudinaryUploadImg;