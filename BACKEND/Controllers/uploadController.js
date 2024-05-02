// import express from 'express'

//====================  UPLOAD IMAGES =========================//
// http://localhost:8800/api/uploadImages/

// export const uploadImages = async (imagePath) => {
//   try {
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };

//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error("Error uploading image to Cloudinary:", error);
//     throw error; // Re-throw the error for higher-level handling
//   }
// };
import fs from "fs-extra";
import cloudinary from 'cloudinary'

export const uploadImages = async (req, res, next) => {
  console.log(req.body);
  try {
    const file = req.file;
    // console.log(file);

    fs.readdirSync("uploads").forEach((file) => {
      console.log(file);
      cloudinary.v2.uploader.upload(`uploads/${file}`, {}, (error, result)=>{
        console.log(result, error);
      });
    });

    res.send({ message: "uploaded" });
  } catch (error) {
    console.log(error);
  }
};

// export const addJobController = async (req, res) => {
//     console.log(req.body, '====>>req.body');

//     try {
//         const folder = 'jobAds';

//         const result = await new Promise((resolve, reject) => {
//             const bufferStream = new stream.PassThrough();
//             bufferStream.end(req.file.buffer);

//             const streamm = cloudinary.uploader.upload_stream(
//                 {
//                     resource_type: 'auto',
//                     folder: folder,
//                 },
//                 (error, result) => {
//                     if (error) reject(error);
//                     else resolve(result);
//                 }
//             );

//             // Pipe the bufferStream into the cloudinary upload stream
//             bufferStream.pipe(streamm);
//         });

//         console.log(result, '====>>result');
//         res.send({ status: 'success', message: 'Job Ad Added' });
//     } catch (error) {
//         console.log(error, '===>>> error');
//         console.log(error.message, '===>>> error message');
//         res.status(500).json({ status: 'error', message: 'Error adding job ad' });
//     }

//     // try {

//     //     // console.log(req, "====>>req")
//     //     console.log(req.file, "====>>req.file")
//     //     console.log(req.body, "==>>req.body")
//     //     const folder = 'jobAds';

//     //     const result = await cloudinary.uploader.upload(req.file.buffer, {
//     //         resource_type: 'auto',
//     //         folder: folder
//     //     });

//     //     console.log(result, "====>>result");

//     //     res.send({ status: 'success', message: 'Job Ad Added' });
//     // } catch (error) {
//     //     console.log(error, "===>>> error")
//     //     console.log(error.message, "===>>> error message")
//     // }
// }
