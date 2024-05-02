import express from "express";

import {
  createLog,
  updateLog,
  deleteLog,
  getResidentsLog
} from "../Controllers/logController.js";
import { verifyToken } from "../Utils/verifyToken.js";

const logRoute = express.Router();

// Create New LOG
// http://localhost:8800/api/log/

logRoute.post("/:residentId", createLog);

// UPDATE New LOG
// http://localhost:8800/api/log/:logId
logRoute.put("/:logId", updateLog);

// DELETE LOG
// http://localhost:8800/api/log/:logId
logRoute.delete("/:logId", deleteLog);


// GET RESIDENTS LOGS
// http://localhost:8800/api/log/find/:residentId
logRoute.get("/find/:residentId", getResidentsLog);



export default logRoute;
