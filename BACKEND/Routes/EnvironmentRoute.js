import express from "express";
import {
  createEnvironmentTags,
  getAllEnvironmentTags
} from "../Controllers/environmentController.js";


const environmentTagsRoute = express.Router();

//localhost:8000/api/environment/
environmentTagsRoute.post("/", createEnvironmentTags);



//localhost:8000/api/environment/tags/find
environmentTagsRoute.get("/tags/find", getAllEnvironmentTags);
export default environmentTagsRoute;
