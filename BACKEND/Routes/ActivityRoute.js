import express from "express";
import {
  createActivityTags,
  getAllActivityTags
} from "../Controllers/activityController.js";


const activityTagsRoute = express.Router();

//localhost:8000/api/activity/
activityTagsRoute.post("/", createActivityTags);



//localhost:8000/api/activity/tags/find
activityTagsRoute.get("/tags/find", getAllActivityTags);

export default activityTagsRoute;
