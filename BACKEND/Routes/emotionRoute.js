import express from "express";
import {
  createEmotionTags,
  getAllEmotionTags
} from "../Controllers/emotionController.js";


const emotionTagsRoute = express.Router();

//localhost:8000/api/emotion/
emotionTagsRoute.post("/", createEmotionTags);



//localhost:8000/api/emotion/tags/find
emotionTagsRoute.get("/tags/find", getAllEmotionTags);


export default emotionTagsRoute;
