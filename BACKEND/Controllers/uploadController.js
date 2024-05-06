// import fs from "fs-extra";
// import cloudinary from "cloudinary";
// import dotenv from "dotenv";
// // import PhotosModel from "../Models/PhotosModel";
// //    UPLOAD IMAGES
// dotenv.config();

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// export const uploadImages = async (req, res, next) => {
//   try {
//     fs.readdirSync("uploads/").forEach((file) => {
//       console.log(file, "====> file from controller");
//      cloudinary.v2.uploader.upload(`uploads/${file}`, {}, (error, result) => {  // const uloadOnCloudinary =
//         const { url } = result;
//         fs.remove(`uploads/${file}`, (err) => {
//           if (err) return console.error(err);
//           console.log("success");
//         });
//         if (error) {
//           return res.status(400).json({
//             message: error,
//           });
//         }
//         console.log(result, "result");
//         res.status(200).send({
//           status: "success",
//           message: "image Uploaded",
//           result: url,
//         });
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };




import fs from "fs-extra";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import PhotoModel from "../Models/PhotosModel.js"; // Import your photo model

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImages = async (req, res, next) => {
  try {
    fs.readdirSync("uploads/").forEach((file) => {
      cloudinary.v2.uploader.upload(`uploads/${file}`, {}, async (error, result) => {
        if (error) {
          return res.status(400).json({
            message: error,
          });
        }
        const { url } = result;

        // Create a new photo document and push the URL into the photos array
        try {
          const newPhoto = new PhotoModel({
            photos: [url], // Assuming you want to store a single URL for each photo document
            albumName: 'New Folder', // You can change this default value if needed
          });
          await newPhoto.save();
          console.log("Image URL saved to MongoDB:", url);
        } catch (error) {
          console.error("Error saving image URL to MongoDB:", error);
        }

        fs.remove(`uploads/${file}`, (err) => {
          if (err) return console.error(err);
          console.log("success");
        });

        res.status(200).send({
          status: "success",
          message: "image Uploaded",
          result: url,
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
