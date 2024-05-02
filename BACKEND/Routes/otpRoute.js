import express from "express";
import {
    sendOtp
} from "../Controllers/otpController.js";

const otpRoute = express.Router();

//localhost:8800/api/auth/signup
otpRoute.post("/send-otp", sendOtp);




export default otpRoute;
