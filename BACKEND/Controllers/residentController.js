import Resident from "../Models/ResidentModel.js";

//====================  NEW RESIDENT =========================//
// http://localhost:8800/api/resident/
export const createResident = async (req, res, next) => {
  console.log(req.user.user);
  // console.log(req)
  if (req.user.user.isCareManager) {
    const newResident = new Resident({
      ...req.body,
      createdBy: req.user.user._id,
    });
    try {
      const saveResident = await newResident.save();
      res.status(200).send({
        status: "Successful",
        message: "Resident Added Successfully",
        data: saveResident,
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).send({
      status: "failed",
      message: "You are not authorized",
    });
  }
};

// //UPDATE RESIDENT
// http://localhost:8800/api/resident/660b37d3da1211544662db30
export const updateResident = async (req, res, next) => {
  try {
    const updateResident = await Resident.findByIdAndUpdate(
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

export const deleteResident = async (req, res, next) => {
  try {
    await Resident.findByIdAndDelete(req.params.residentId);
    res.status(200).send({
      status: "Successful",
      message: "Resident deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// //GET RESIDENT
// http://localhost:8800/api/resident/find/660b413793cbd11706eb9a32

export const getResident = async (req, res, next) => {
  try {
    const resident = await Resident.findById(req.params.residentId);
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
export const getAllResidents = async (req, res, next) => {
  try {
    // Database query to retrieve all residents
    const residents = await Resident.find();

    // Sending the retrieved residents as response
    res.status(200).json({
      status: "Success",
      message: "All residents retrieved successfully",
      data: residents,
    });
  } catch (error) {
    // Handling errors
    console.error("Error while retrieving residents:", error);
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve residents",
      error: error.message,
    });
  }
};



// export const searchResidents = async (req, res, next) => {
//   const {residentName} = req.query
//   const queryObject = {}

//   if(residentName){
//     queryObject.residentName = residentName
//     console.log(queryObject)
//   }

//   try {
//     const searchRes = await Resident.find(req.query);
//     console.log(searchRes);

//     if(!searchRes) {
//       return
//       res.status(200).json({
//         message: "Resident is here",
//         data: searchRes,
//       });
    
//     } else {
//       res.status(400).json({
//         message : "this user is not valid",
//         status  :"failed"
//        })
//     }
    
//   } catch (error) {
//     console.error("Error searching residents:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };




export const searchResidents = async (req, res, next) => {
  const { residentName } = req.query;
  const queryObject = {};

  if (residentName) {
    queryObject.residentName = residentName;
    console.log(queryObject);
  }

  try {
    const searchRes = await Resident.find(queryObject); // Use queryObject instead of req.query
    console.log(searchRes);

    if (searchRes.length > 0) { // Check if searchRes contains any data
      res.status(200).json({
        message: "Resident found",
        data: searchRes,
      });
    } else {
      res.status(404).json({ // Change status code to 404 for "Not Found"
        message: "Resident not found",
        status: "failed"
      });
    }
  } catch (error) {
    console.error("Error searching residents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





// residentController.js

// const Resident = require('../models/resident');

// Search residents by name
// export const searchResidentsByName = async (req, res) => {
//   try {
//     const { name } = req.query;
//     if (!name) {
//       return res.status(400).json({ error: 'Name parameter is required' });
//     }

//     // Create Mongoose query to search residents by name
//     const matchingResidents = await Resident.find({
//       name: { $regex: new RegExp(name, 'i') } // Case-insensitive search
//     });

//     res.json({ residents: matchingResidents });
//   } catch (error) {
//     console.error('Error searching residents:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
