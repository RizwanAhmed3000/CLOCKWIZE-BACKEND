import express from "express";
import {
  register,
  login,
  forgotPassword,
} from "../Controllers/authController.js";

const authRoutes = express.Router();

//localhost:8800/api/auth/signup
authRoutes.post("/signup", register);


//localhost:8800/api/auth/login
authRoutes.post("/login", login);

//localhost:8800/api/auth/forgetpass
authRoutes.get("/forgetPass", forgotPassword);

export default authRoutes;
