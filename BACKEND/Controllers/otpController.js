import nodemailer from "nodemailer";

// Function to generate OTP
export const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  try {
    const otp = generateOTP(); // Generate OTP

    // Function to send OTP via email
    sendOTPByEmail(email, otp);

    res.status(200).send({
      status: "Successful",
      message: "OTP send Successfully",
      data: {
        userEmail: email,
        otp,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Generate otp function
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send email function
const sendOTPByEmail = async (toEmail, otp) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.FOUNDER_EMAIL, // Sender's email address
      pass: process.env.FOUNDER_PASS, // Sender's email password
    },
  });
  try {
    let info = await transporter.sendMail({
      from: process.env.FOUNDER_EMAIL, // Sender's email address
      to: toEmail, // Receiver's email address
      subject: "Your OTP", // Email subject
      text: `Your OTP is: ${otp}`, // Email body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error);
  }
};
