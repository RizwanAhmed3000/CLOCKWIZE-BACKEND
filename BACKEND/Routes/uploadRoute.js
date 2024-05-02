import express from "express";
import multer from 'multer'
import  cloudinary  from "cloudinary";
import { uploadImages } from "../Controllers/uploadController.js";
import  dotenv  from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// console.log(cloudinary.config());

// export default cloudinary

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "uploads/"); // Removed leading "/"
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      console.log('file',file, uniqueSuffix)
      cb(null, `${uniqueSuffix}-${file.originalname}`); // Added "-" separator
    },
  });
  
  const upload = multer({ storage: storage });
  

const uploadRoute = express.Router();

//UPLOAD IMAGE ROUTE ====>

uploadRoute.post("/", upload.single('file'), uploadImages);

export default uploadRoute;
