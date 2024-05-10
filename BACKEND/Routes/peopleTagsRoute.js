import express from "express";
import {
  createPeopleTags,
  getAllPeopleTags
} from "../Controllers/peopleController.js";


const peopleTagsRoute = express.Router();

//localhost:8000/api/admin/signup
peopleTagsRoute.post("/", createPeopleTags);



//localhost:8000/api/admin/getAllAdmin
peopleTagsRoute.get("/tags/find", getAllPeopleTags);

export default peopleTagsRoute;
