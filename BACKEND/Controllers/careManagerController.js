import user from "../Models/UserModel.js";

// CREATE CARE MANAGER BY ADMIN
export const createCareManger = async (req, res, next) => {
//   console.log(req.user, "request");
  // console.log(req.user.user , ' request.user.user');
  if (req.user.user.isAdmin) {
    //req.user.user.isAdmin
    const newCareManager = new user({
      ...req.body,
      isCareManager: req.body.isCareManager,
      isCarer: req.body.isCarer,
      //   createdBy: req.user._id,
    });
    try {
      const saveCareManager = await newCareManager.save();
      res.status(200).send({
        status: "Successful",
        message: "care Manager create Successfully",
        data: saveCareManager,
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).send({
      status: "failed",
      message: "You are not admin",
    });
  }
};

// Middleware function to check if the user is an admin
// const isAdmin = (req, res, next) => {
//     if (!req.user || !req.user.isAdmin) {
//       return res.status(403).json({ message: "Only admins can perform this action" });
//     }
//     next();
//   };

//   // Route for creating a care manager
//   app.post("/api/care-managers", isAdmin, async (req, res) => {
//     // Only admins can reach this point
//     // Your code to create a care manager goes here
//   });
