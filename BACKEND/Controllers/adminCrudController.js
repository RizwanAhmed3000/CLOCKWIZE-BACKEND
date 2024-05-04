import Admin from '../Models/AdminModel.js'

// //UPDATE RESIDENT
// http://localhost:8800/api/resident/660b37d3da1211544662db30
export const updateAdmin = async (req, res, next) => {
    try {
      const updateAdmin = await Admin.findByIdAndUpdate(
        req.params.adminId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send({
        status: "Successful",
        message: "Admin Updated Successfully",
        data: updateAdmin,
      });
    } catch (error) {
      next(error);
    }
  };
  
  // //DELETE ADMIN
  // http://localhost:8800/api/admin/delete/:adminID
  
  export const deleteAdmin = async (req, res, next) => {
    try {
      await Admin.findByIdAndDelete(req.params.adminId);
      res.status(200).send({
        status: "Successful",
        message: "Admin deleted Successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  
  // //GET RESIDENT
  // http://localhost:8800/api/resident/find/660b413793cbd11706eb9a32
  
  export const getAdmin = async (req, res, next) => {
    try {
      const admin = await Admin.findById(req.params.adminId);
      !admin &&
        res.status(404).send({
          status: "Failed",
          message: "Admin not found",
        });
      res.status(200).send({
        status: "Successful",
        message: "Admin Found",
        data: admin,
      });
    } catch (error) {
      next(error);
    }
  };
  
  //GET ALL RESIDENTS
  // http://localhost:8800/api/resident/find/
  export const getAllAdmin = async (req, res, next) => {
    try {
      // Database query to retrieve all residents
      const allAdmins = await Admin.find();
  
      // Sending the retrieved residents as response
      res.status(200).json({
        status: "Success",
        message: "All Admins retrieved successfully",
        data: allAdmins,
      });
    } catch (error) {
      // Handling errors
      console.error("Error while retrieving Admins:", error);
      res.status(500).json({
        status: "Error",
        message: "Failed to retrieve Admins",
        error: error.message,
      });
    }
  };
  
  
  
  
//   export const searchResidents = async (req, res, next) => {
//     const { residentName } = req.query;
//     const queryObject = {};
  
//     if (residentName) {
//       queryObject.residentName = residentName;
//       console.log(queryObject);
//     }
  
//     try {
//       const searchRes = await Resident.find(queryObject); // Use queryObject instead of req.query
//       console.log(searchRes);
  
//       if (searchRes.length > 0) { // Check if searchRes contains any data
//         res.status(200).json({
//           message: "Resident found",
//           data: searchRes,
//         });
//       } else {
//         res.status(404).json({ // Change status code to 404 for "Not Found"
//           message: "Resident not found",
//           status: "failed"
//         });
//       }
//     } catch (error) {
//       console.error("Error searching residents:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };
  
  
  
  
  
  