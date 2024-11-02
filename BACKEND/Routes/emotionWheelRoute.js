import express from "express";

import { verifyToken } from "../Utils/verifyToken.js";
import { createEmotion, getResidentsEmotion } from "../Controllers/emotionWheelController.js";

const emotionWheelRoute = express.Router();

emotionWheelRoute.post("/:residentId", createEmotion);

// UPDATE New LOG
// http://localhost:8800/api/log/:logId
// emotionWheelRoute.put("/:logId", updateLog);

// DELETE LOG
// http://localhost:8800/api/log/:logId
// emotionWheelRoute.delete("/:logId", deleteLog);


// GET RESIDENTS LOGS
// http://localhost:8800/api/log/find/:residentId
emotionWheelRoute.get("/find/:residentId", getResidentsEmotion);

export default emotionWheelRoute;

