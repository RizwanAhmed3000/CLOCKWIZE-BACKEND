// export const forgetPass = async (req, res, next) => {};
import nodemailer from "nodemailer"
import User from "../Models/UserModel.js";
import bcryptjs from "bcryptjs"
import { createError } from "../Utils/error.js";
import jwt from "jsonwebtoken"

const { genSalt, hash } = bcryptjs

//=========================== USER REGISTERATON ====================//
// localhost:8800/api/auth/signup
export const register = async (req, res, next) => {
    // console.log(req.user.admin.isAdmin)
    // console.log(req.user.user.isCareManager, "===>>>> from controller")
    // console.log(req.user.admin, "===>>>> from controller")
    if (req.user?.admin || req.user?.user.isCareManager) {
        try {
            //==========HASHING PASSWORD USING BCRYPTJS===================//
            const salt = await genSalt(12);
            const hashPassword = await hash(req.body.password, salt);


            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
                // profileImage: req.body?.profileImage,
                isCareManager: req.body.isCareManager,
                isCarer: req.body.isCarer,
                // isAdmin : req.body.isAdmin
            });


            //REMOVING CRITICAL INFO FROM THE DATA TO SEND THE RESPONSE

            const { password, ...other } = newUser._doc;

            //SAVING THE USER
            await newUser.save();
            let message = "Registration Successful";
            // if (req.body.isAdmin) {
            //     message = "Admin registration successful";
            // } else if (req.body.isCareManager) {
            //     message = "Care Manager registration successful";
            // } else if (req.body.isCarer) {
            //     message = "Carer registration successful";
            // }

            res.status(200).send({
                status: "Successful",
                message: message,
                data: other,
            });
        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({
            message: "you are not authorized for this"
        })
    }

};

//=========================== USER LOGIN ====================//
//localhost:8800/api/auth/login
export async function login(req, res, next) {
    try {

        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (!user) {

            // next(404, "User not found")
            next(createError(404, `User not found`))  //${message}
            return
        };
        // const isCorrect = await bcryptjs.compare(req.body.password, user.password);
        // if (!isCorrect) {
        //     // next(400, "Incorrect email or password")
        //     next(createError(400, "Incorrect email or password"))
        //     return
        // };
        const token = jwt.sign({ user }, process.env.JWT, { expiresIn: '24h' });
        const { password, ...other } = user._doc;

        let message = "User sign in successfully";
        if (user.isAdmin) {
            message = "Admin sign in successfully";
        } else if (user.isCareManager) {
            message = "Care Manager sign in successfully";
        } else if (user.isCarer) {
            message = "Carer sign in successfully";
        }

        res.status(200).send({
            status: "Success",
            message: message,
            data: other,
            access_token: token
        });
    } catch (error) {
        // next(error.status, error.message)
        next(createError(error.status, error.message))
    }
}

//=========================== USER FORGOT PASSWORD ====================//
//localhost:8800/api/auth/login
export async function forgotPassword(req, res, next) {
    try {
        const { email } = req.body;
        if (email) {
            const user = await User.findOne({ email: email })
            // console.log(user)
            if (user) {
                const secret = user._id + process.env.JWT
                const token = jwt.sign({ secret }, process.env.JWT, { expiresIn: "30m" })
                const link = `http:localhost:8800/api/auth/resetpassword/usertoken/${token}`
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.NODEMAILER_USER,
                        pass: process.env.NODEMAILER_PASS
                    }
                })

                const mailOptions = {
                    from: process.env.EMAIL_FROM,
                    to: process.env.EMAIL_TO,
                    subject: "reset password link",
                    text: `Please click on the following link ${link} to reset your password`
                }

                transport.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err.message)
                        return res.status(400).send({
                            status: "Failed",
                            message: err.message
                        })
                    } else {
                        console.log("email send" + info.response)
                        return res.status(200).send({
                            status: "Success",
                            message: "Reset password link generated"
                        })
                    }
                })
            }
        } else {
            console.log("no user found")
        }
    } catch (error) {
        next(createError(error.status, error.message))
    }
}