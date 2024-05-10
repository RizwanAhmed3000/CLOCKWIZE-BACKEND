import Environment from "../Models/EnvironmentModel.js";

// createPeopleTags

export const createEnvironmentTags = async (req, res, next) => {
  try {
    const createTags = new Environment({
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
export const getAllEnvironmentTags = async (req, res, next) => {
  try {
    // Database query to retrieve all Environment
    const allEnvironmentTags = await Environment.find();

    // Sending the retrieved Environment as response
    res.status(200).json({
      status: "Success",
      message: "All Environment tags retrieved successfully",
      data: allEnvironmentTags,
    });
  } catch (error) {
    // Handling errors
    console.error("Error while retrieving Environment:", error);
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve Environment",
      error: error.message,
    });
  }
};
