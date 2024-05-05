import photos from "../Models/PhotosModel.js";

//====================  NEW RESIDENT =========================//
// http://localhost:8800/api/album/
export const createAlbum = async (req, res, next) => {
    try {
      const residentId = req.params.residentId; // Get the resident ID from request parameters
  
      // Create a new Family object with the resident ID from the request parameters
      const newAlbum = new photos({
        ...req.body,
        residentId: residentId, // Set the residentId property of the Family object
      });
  
      // Save the new family member to the database
      const saveAlbum = await newAlbum.save();
      // console.log(saveFamily)
      const { _id } = saveAlbum;
      console.log(_id);
  
      await photos.updateOne(
        { _id: req.params.residentId },
        {
          $push: { residentId: _id },
        }
      );
  
      res.status(200).send({
        status: "Successful",
        message: "Album Added Successfully",
        data: saveAlbum,
      });
    } catch (error) {
      next(error);
    }
  };
// };

// //UPDATE RESIDENT
// http://localhost:8800/api/resident/660b37d3da1211544662db30
export const updateResident = async (req, res, next) => {
  try {
    const updateResident = await photos.findByIdAndUpdate(
      req.params.residentId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      status: "Successful",
      message: "Resident Updated Successfully",
      data: updateResident,
    });
  } catch (error) {
    next(error);
  }
};

// //DELETE RESIDENT
// http://localhost:8800/api/resident/660b37d3da1211544662db30

// export const deleteResident = async (req, res, next) => {
//   try {
//     await photos.findByIdAndDelete(req.params.residentId);
//     res.status(200).send({
//       status: "Successful",
//       message: "Resident deleted Successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// //GET RESIDENT
// http://localhost:8800/api/resident/find/660b413793cbd11706eb9a32

export const getResident = async (req, res, next) => {
  try {
    const resident = await photos.findById(req.params.residentId);
    !resident &&
      res.status(404).send({
        status: "Failed",
        message: "Resident not found",
      });
    res.status(200).send({
      status: "Successful",
      message: "Resident Found",
      data: resident,
    });
  } catch (error) {
    next(error);
  }
};

//GET ALL RESIDENTS
// http://localhost:8800/api/resident/find/
// export const getAllResidents = async (req, res, next) => {
//   try {
//     // Database query to retrieve all residents
//     const residents = await photos.find();

//     // Sending the retrieved residents as response
//     res.status(200).json({
//       status: "Success",
//       message: "All residents retrieved successfully",
//       data: residents,
//     });
//   } catch (error) {
//     // Handling errors
//     console.error("Error while retrieving residents:", error);
//     res.status(500).json({
//       status: "Error",
//       message: "Failed to retrieve residents",
//       error: error.message,
//     });
//   }
// };
