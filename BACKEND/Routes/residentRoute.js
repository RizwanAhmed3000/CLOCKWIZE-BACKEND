import express from "express";
import { verifyToken } from "../Utils/verifyToken.js";
import {
  createResident,
  updateResident,
  deleteResident,
  getResident,
  getAllResidents,
  searchResidents,
  // searchResidentsByName
} from "../Controllers/residentController.js";

const residentRoutes = express.Router();

//======================= CREATE RESIDENTS ======================//
// http://localhost:8800/api/resident/
// residentRoutes.post("/", verifyAdmin, createResident);
residentRoutes.post("/", verifyToken, createResident);

//======================= UPDATE RESIDENTS ======================//
// http://localhost:8800/api/resident/660b37d3da1211544662db30
// residentRoutes.put("/:residentId", verifyAdmin, updateResident);
residentRoutes.put("/:residentId", updateResident);

//======================= DELETE RESIDENTS ======================//
// http://localhost:8800/api/resident/660b37d3da1211544662db30
// residentRoutes.delete("/:residentId", verifyAdmin, deleteResident);
residentRoutes.delete("/:residentId", deleteResident);

//======================= GET A RESIDENTS ======================//
// http://localhost:8800/api/resident/find/660b413793cbd11706eb9a32
residentRoutes.get("/find/:residentId", getResident);

//======================= SEARCH RESIDENTS BY NAME ======================//
//localhost:8800/api/resident/find/
residentRoutes.get("/searchResident", searchResidents);
// searchResidentsByName

residentRoutes.get("/find", getAllResidents);


export default residentRoutes;
