import express from "express";
import {
  register,
  login,
  forgotPassword,
} from "../Controllers/authController.js";
import { verifyToken } from "../Utils/verifyToken.js";

const authRoutes = express.Router();

//localhost:8800/api/auth/signup
authRoutes.post("/signup", verifyToken, register);


//localhost:8800/api/auth/login
authRoutes.post("/login", login);

//localhost:8800/api/auth/forgetpass
authRoutes.get("/forgetPass", forgotPassword);

export default authRoutes;
