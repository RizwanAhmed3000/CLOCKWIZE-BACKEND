import express from "express";
import { addInterest, getResidentsInterest } from "../Controllers/interestController.js";


const interestRoute = express.Router();

//localhost:8000/api/activity/
interestRoute.post("/:residentId", addInterest);

//localhost:8000/api/activity/tags/find
interestRoute.get("/find/:residentId", getResidentsInterest);

export default interestRoute;
