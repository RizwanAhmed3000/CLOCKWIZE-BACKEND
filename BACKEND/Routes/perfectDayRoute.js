import express from "express";
// import { verifyToken } from "../Utils/verifyToken.js";
import {
  createPerfectDay,
  updatePerfectDay,
  getPerfectDay,
  deletePerfectDay,
  getAllPerfectDay
} from "../Controllers/perfectDayController.js";

const perfectDayRoutes = express.Router();

//======================= CREATE PERFECT DAY ======================//
// http://localhost:8000/api/perfectDay/RESIDENTID/LOGINID
perfectDayRoutes.post("/:residentId/:loginId", createPerfectDay);

//======================= UPDATE PERFECT DAY  ======================//
// http://localhost:8000/api/perfectDay/perfectDayId
perfectDayRoutes.put("/:perfectDayId", updatePerfectDay);

//======================= DELETE PERFECT DAY  ======================//
// http://localhost:8000/api/perfectDay/660b37d3da1211544662db30
perfectDayRoutes.delete("/delete/:perfectDayId", deletePerfectDay);

//======================= GET PERFECT DAY  ======================//
// http://localhost:8000/api/perfectDay/find/660b413793cbd11706eb9a32
perfectDayRoutes.get("/find/:perfectDayId", getPerfectDay);

//======================= GET ALL PERFECT DAY ======================//
//localhost:8000/api/perfectDay/find
perfectDayRoutes.get("/find", getAllPerfectDay);

export default perfectDayRoutes;
