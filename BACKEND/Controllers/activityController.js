import Activity from "../Models/ActivityModel.js";

// createActivityTags

export const createActivityTags = async (req, res, next) => {
  try {
    const createTags = new Activity({
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

// getAllActivityTags
export const getAllActivityTags = async (req, res, next) => {
  try {
    // Database query to retrieve all Activity
    const allActivityTags = await Activity.find();

    // Sending the retrieved Activity as response
    res.status(200).json({
      status: "Success",
      message: "All Activity tags retrieved successfully",
      data: allActivityTags,
    });
  } catch (error) {
    // Handling errors
    console.error("Error while retrieving Activity:", error);
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve Activity",
      error: error.message,
    });
  }
};
