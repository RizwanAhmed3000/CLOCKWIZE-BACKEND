import fs from "fs-extra";
import cloudinary from "cloudinary";

//    UPLOAD IMAGES

export const uploadImages = async (req, res, next) => {
  // console.log(req.body);

  try {
    // const file = req.file;
    // console.log(file);

    fs.readdirSync("uploads/").forEach((file) => {
      console.log(file);                            // public_id: "olympic_flag"
      // cloudinary.uploader.upload(`uploads/${file}`, {  }, (error, result) => console.log(result , 'result')
      //   // console.log(error , 'error')
        
        
      // );
      cloudinary.v2.uploader.upload(`uploads/${file}`, {}, (error, result) => {
        console.log(result, 'result');
        console.log('error', error);
      });
    });

    res.send({ message: "uploaded" });
  } catch (error) {
    console.log(error);
  }
};
