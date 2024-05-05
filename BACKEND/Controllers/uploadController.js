import fs from "fs-extra";
import cloudinary from "cloudinary";
import dotenv from 'dotenv'
//    UPLOAD IMAGES
dotenv.config();

  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

export const uploadImages = async (req, res, next) => {
  // console.log(req.body);
  
  try {
   
    // const file = req.file;
    // console.log(file);

    fs.readdirSync("uploads/").forEach((file) => {
      console.log(file); // public_id: "olympic_flag"
      // cloudinary.uploader.upload(`uploads/${file}`, {  }, (error, result) => console.log(result , 'result')
      //   // console.log(error , 'error')
console.log(file);
      // );
      cloudinary.v2.uploader.upload(`uploads/${file}`, {}, (error, result) => {
        console.log(result, "result");
        console.log("error", error);
      });
    });

    res.send({ message: "uploaded" });
  } catch (error) {
    console.log(error);
  }
};
