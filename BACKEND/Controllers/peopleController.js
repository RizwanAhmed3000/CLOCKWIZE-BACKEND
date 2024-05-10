import PeopleTagsModel from "../Models/PeopleTagsModel.js";

// createPeopleTags

export const createPeopleTags = async (req, res, next) => {
  try {
    const createTags = new PeopleTagsModel({
      ...req.body,
    });
    const saveTags = await createTags.save();
    console.log(saveTags);
    res.status(200).json({
      status: "Successful",
      message: "Create Tag Successfully",
      data: saveTags,
    });
  } catch (error) {
    next(error);
  }
};

// getAllPeopleTags
export const getAllPeopleTags = async (req, res, next) => {
  try {
    // Database query to retrieve all Albums
    const allPeopleTags = await PeopleTagsModel.find();

    // Sending the retrieved residents as response
    res.status(200).json({
      status: "Success",
      message: "All peoples tags retrieved successfully",
      data: allPeopleTags,
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
