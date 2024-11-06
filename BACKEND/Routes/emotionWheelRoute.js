import express from "express";

import { verifyToken } from "../Utils/verifyToken.js";
import { createEmotion, getResidentsEmotion } from "../Controllers/emotionWheelController.js";

const emotionWheelRoute = express.Router();

emotionWheelRoute.post("/:residentId", createEmotion);

// GET RESIDENTS LOGS
// http://localhost:8800/api/log/find/:residentId
emotionWheelRoute.get("/find/:residentId", getResidentsEmotion);

export default emotionWheelRoute;

