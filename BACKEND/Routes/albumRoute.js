import express from "express";
import {
  createAlbum
} from "../Controllers/albumController.js";

const albumRoutes = express.Router();

//localhost:8800/api/auth/signup
albumRoutes.post("/:residentId", createAlbum);


//localhost:8800/api/auth/login
// albumRoutes.post("/login", login);

//localhost:8800/api/auth/forgetpass
// albumRoutes.get("/forgetPass", forgotPassword);

export default albumRoutes;
