import Emotion from "../Models/EmotionModel.js";

// createEmotionTags

export const createEmotionTags = async (req, res, next) => {
  try {
    const createTags = new Emotion({
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


// getAllEmotionTags
export const getAllEmotionTags = async (req, res, next) => {
  try {
    // Database query to retrieve all Emotion
    const allEmotionTags = await Emotion.find();

    // Sending the retrieved Emotion as response
    res.status(200).json({
      status: "Success",
      message: "All Emotion tags retrieved successfully",
      data: allEmotionTags,
    });
  } catch (error) {
    // Handling errors
    console.error("Error while retrieving Emotion:", error);
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve Emotion",
      error: error.message,
    });
  }
};
