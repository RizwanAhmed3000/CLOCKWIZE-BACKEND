import express from "express";
import {
  register,
  login,
  forgotPassword,
} from "../Controllers/adminController.js";

const adminRoutes = express.Router();

//localhost:8800/api/auth/signup
adminRoutes.post("/signup", register);


//localhost:8800/api/auth/login
adminRoutes.post("/login", login);

//localhost:8800/api/auth/forgetpass
adminRoutes.get("/forgetPass", forgotPassword);

export default adminRoutes;
