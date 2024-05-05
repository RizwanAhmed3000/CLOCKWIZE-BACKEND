import User from "../Models/UserModel.js";

// SEARCH CARE MANAGER BY QUERY
export const searchCareManager = async (req, res, next) => {
  const { isCareManager, isCarer } = req.query;

  const queryObject = {};

  // Convert isCareManager and isCarer to boolean values
  const isCM = isCareManager === "true";
  const isCR = isCarer === "true";

  // Check if isCareManager or isCarer is requested
  if (isCM) {
    queryObject.isCareManager = isCM;
  } else if (isCR) {
    queryObject.isCarer = isCR;
  }

  try {
    const users = await User.find(queryObject);

    if (users.length > 0) {
      res.status(200).json({
        message: "Users found",
        data: users,
      });
    } else {
      res.status(404).json({
        message: "Users not found",
      });
    }
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
