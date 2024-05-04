import Admin from '../Models/AdminModel.js'

// //UPDATE ADMIN
// http://localhost:8800/api/admin/660b37d3da1211544662db30
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
  
  // //GET ADMIN
  // http://localhost:8800/api/admin/find/660b413793cbd11706eb9a32
  
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
  
  //GET ALL Admins
  // http://localhost:8800/api/admin/getAllAdmins/
  export const getAllAdmin = async (req, res, next) => {
    try {
      // Database query to retrieve all Admin
      const allAdmins = await Admin.find();
  
      // Sending the retrieved Admins as response
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
  
  
  
  
  
  
  
  