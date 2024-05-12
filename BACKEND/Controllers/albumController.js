import photos from "../Models/PhotosModel.js";

//====================  NEW ALBUM =========================//
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
    console.log(saveAlbum)

    res.status(200).send({
      status: "Successful",
      message: "Album Added Successfully",
      data: saveAlbum,
    });
  } catch (error) {
    next(error);
  }
};

// //UPDATE ALBUM
// http://localhost:8800/api/album/update/660b37d3da1211544662db30
export const updateAlbum = async (req, res, next) => {
  try {
    const updateAlbum = await photos.findByIdAndUpdate(
      req.params.albumId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      status: "Successful",
      message: "Album Updated Successfully",
      data: updateAlbum,
    });
  } catch (error) {
    next(error);
  }
};

// //DELETE RESIDENT
// http://localhost:8800/api/album/delete/660b37d3da1211544662db30

export const deleteAlbum = async (req, res, next) => {
  try {
    await photos.findByIdAndDelete(req.params.albumId);
    res.status(200).send({
      status: "Successful",
      message: "Album deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// //GET ALBUM
// http://localhost:8800/api/album/find/660b413793cbd11706eb9a32

export const getAlbum = async (req, res, next) => {
  try {
    const album = await photos.findById(req.params.albumId);
    !album &&
      res.status(404).send({
        status: "Failed",
        message: "Album not found",
      });
    res.status(200).send({
      status: "Successful",
      message: "Album Found",
      data: album,
    });
  } catch (error) {
    next(error);
  }
};

//GET ALL RESIDENTS
// http://localhost:8800/api/album/findAllAlbums/
export const getAllAlbum = async (req, res, next) => {
  try {
    // Database query to retrieve all Albums
    const allAlbums = await photos.find({ residentId: req.params.residentId });

    // Sending the retrieved residents as response
    res.status(200).json({
      status: "Success",
      message: "All Albums retrieved successfully",
      data: allAlbums,
    });
  } catch (error) {
    // Handling errors
    console.error("Error while retrieving Albums:", error);
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve Albums",
      error: error.message,
    });
  }
};
