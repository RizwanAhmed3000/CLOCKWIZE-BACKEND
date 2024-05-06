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

  try {

    fs.readdirSync("uploads/").forEach((file) => {
      console.log(file, "====> file from controller");
      cloudinary.v2.uploader.upload(`uploads/${file}`, {}, (error, result) => {
        console.log(result, "result");
        res.status(200).send({
          status: "success",
          message: "image Uploaded",
          result: result
        })
      });
    });
  } catch (error) {
    console.log(error);
  }

};
