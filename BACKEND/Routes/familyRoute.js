import express from "express";
// import { verifyAdmin, verifyUser } from "../Utils/verifyToken.js";
import {
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  getFamilyMember,
  // getAllResidents,
} from "../Controllers/familyController.js";

const familyRoutes = express.Router();



//======================= CREATE RESIDENTS ======================//
// http://localhost:8800/api/resident/

// familyRoutes.post("/:residentId", verifyAdmin, createFamilyMember);
familyRoutes.post("/:residentId", createFamilyMember);

//======================= UPDATE RESIDENTS ======================//
// http://localhost:8800/api/resident/660b37d3da1211544662db30

// familyRoutes.put("/:familyId", verifyAdmin, updateFamilyMember);
familyRoutes.put("/:familyId", updateFamilyMember);

//======================= DELETE RESIDENTS ======================//
// http://localhost:8800/api/resident/660b37d3da1211544662db30

// familyRoutes.delete("/:familyId", verifyAdmin, deleteFamilyMember);
familyRoutes.delete("/:familyId", deleteFamilyMember);

//======================= GET A RESIDENTS ======================//
// http://localhost:8800/api/resident/find/660b413793cbd11706eb9a32
familyRoutes.get("/find/:residentId", getFamilyMember);

//======================= GET ALL RESIDENTS ======================//
//localhost:8800/api/resident/find/
// http: familyRoutes.get("/find", getAllResidents);

export default familyRoutes;
