// import fs from "fs-extra";
// import cloudinary from "cloudinary";
// import dotenv from "dotenv";
// // import PhotoModel from "../Models/PhotosModel.js"; // Import your photo model

// dotenv.config();

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// export const uploadImages = async (req, res, next) => {
//   try {
//     fs.readdirSync("uploads/").forEach((file) => {
//       cloudinary.v2.uploader.upload(`uploads/${file}`, {}, async (error, result) => {
//         if (error) {
//           return res.status(400).json({
//             message: error,
//           });
//         }
//         const { url } = result;

//         // // Create a new photo document and push the URL into the photos array
//         // try {
//         //   const newPhoto = new PhotoModel({
//         //     photos: [url], // Assuming you want to store a single URL for each photo document
//         //     albumName: 'New Folder', // You can change this default value if needed
//         //   });
//         //   await newPhoto.save();
//         //   console.log("Image URL saved to MongoDB:", url);
//         // } catch (error) {
//         //   console.error("Error saving image URL to MongoDB:", error);
//         // }

//         fs.remove(`uploads/${file}`, (err) => {
//           if (err) return console.error(err);
//           console.log("success");
//         });

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
// import PhotoModel from "../Models/PhotosModel.js"; // Import your photo model

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files were uploaded.",
      });
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path, {}, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.url);
          }
        });
      });
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        // URLs array contains the uploaded image URLs
        // Now you can process these URLs as needed
        // For example, you can save them to your database
        // or perform any other operations
        
        // Example code to save URLs to MongoDB:
        /*
        const newPhoto = new PhotoModel({
          photos: urls,
          albumName: 'New Folder',
        });
        await newPhoto.save();
        */

        res.status(200).json({
          status: "success",
          message: "Images uploaded successfully",
          results: urls,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: "error",
          message: "Failed to upload images",
          error: error.message,
        });
      });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};












// import fs from "fs-extra";
// import cloudinary from "cloudinary";
// import dotenv from "dotenv";
// import pLimit from 'p-limit'
// // import PhotoModel from "../Models/PhotosModel.js"; // Import your photo model

// dotenv.config();

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// const images = []
// const limit = pLimit(10)

// const imagesUpload = images.map((image)=> {
//   return limit(async () => {

//   })
// })
// export const uploadImages = async (req, res, next) => {
//   try {
//     for (const image in images) {
//       fs.readdirSync("uploads/").forEach((file) => {
//         cloudinary.v2.uploader.upload(`${images[image]}/${file}`, {}, async (error, result) => {
//           if (error) {
//             return res.status(400).json({
//               message: error,
//             });
//           }
//           const { url } = result
  
//           fs.remove(`${images[image]}/${file}`, (err) => {
//             if (err) return console.error(err);
//             console.log("success");
//           });
  
//           res.status(200).send({
//             status: "success",
//             message: "image Uploaded",
//             result: url,
//           });
//         });
//       });
//     }
    
//   } catch (error) {
//     console.log(error);
//   }
// };
