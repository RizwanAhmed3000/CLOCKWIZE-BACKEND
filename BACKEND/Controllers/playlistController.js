import Playlists from "../Models/PlaylistModel.js";

export const createPlaylists = async (req, res, next) => {
  try {
    const residentId = req.params.residentId; // Get the resident ID from request parameters

    // Create a new Playlist object with the resident ID from the request parameters
    const newPlaylist = new Playlists({
      ...req.body,
      residentId: residentId, // Set the residentId property of the Family object
    });

    // Save the new family member to the database
    const savePlaylist = await newPlaylist.save();
    // console.log(saveFamily)
    const { _id } = savePlaylist;
    // console.log(_id);


    res.status(200).send({
      status: "Successful",
      message: "Playlist Added Successfully",
      data: savePlaylist,
    });
  } catch (error) {
    next(error);
  }
};
