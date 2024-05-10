import express from "express";
import {
  createPeopleTags,
  getAllPeopleTags
} from "../Controllers/peopleController.js";


const peopleTagsRoute = express.Router();

//localhost:8000/api/people/
peopleTagsRoute.post("/", createPeopleTags);



//localhost:8000/api/people/tags/find
peopleTagsRoute.get("/tags/find", getAllPeopleTags);

export default peopleTagsRoute;
