// export const sendOtp = async (req, res, next) => {
//         const emailConfig = {
//           service: "gmail",
//           auth: {
//             user: process.env.FOUNDER_EMAIL,
//             pass: process.env.FOUNDER_PASSWORD,
//           },
//         };

//         const phoneConfig = {
//           accountSid: process.env.TWILIO_ACCOUNT_SID,
//           authToken: process.env.TWILIO_ACCOUNT_AUTH_TOKEN,
//           fromNumber: process.env.TWILIO_PHONE_NUMBER,
//         };

//         // Function to send OTP via email
//         async function sendEmailOTP(mail, otp) {
//           const transporter = nodemailer.createTransport(emailConfig);

//           const mailOptions = {
//             from: process.env.FOUNDER_EMAIL,
//             to: mail,
//             subject: "OTP Verification",
//             text: `Your OTP is: ${otp}`,
//           };

//           try {
//             await transporter.sendMail(mailOptions);
//             return `OTP sent to ${mail} via email`;
//           } catch (error) {
//             throw `Error sending OTP to ${mail} via email: ${error}`;
//           }
//         }

//         // Function to send OTP via SMS
//         async function sendSMSOTP(phoneNumber, otp) {
//           const client = new twilio(phoneConfig.accountSid, phoneConfig.authToken);

//           try {
//             const message = await client.messages.create({
//               body: `Your OTP is: ${otp}`,
//               from: phoneConfig.fromNumber,
//               to: phoneNumber,
//             });

//             return `OTP sent to ${phoneNumber} via SMS with SID: ${message.sid}`;
//           } catch (error) {
//             throw `Error sending OTP to ${phoneNumber} via SMS: ${error}`;
//           }
//         }

//         // Function to extract email addresses from text
//         function extractEmails(text) {
//           const emailRegex = /[a-zA=Z0-9._-]+@[a-zA=Z0-9._-]+\.[a-zA-Z]{2,4}/g;
//           return text.match(emailRegex);
//         }

//         // Function to extract phone numbers from text
//         function extractPhoneNumbers(text) {
//           const phoneRegex = /(?:\+\d{12}|\b\d{11})\b/g;
//           return text.match(phoneRegex);
//         }

//         try {
//           const {
//             designation,
//             description,
//             companyName,
//             skills,
//             experience,
//             payRangeStart,
//             payRangeEnd,
//             jobFeseability,
//             jobType,
//             country,
//             city,
//             hashTags,
//             applyEmail,
//             applyPhone,
//           } = req.body;
//           // console.log(req.body, "===>req.body");

//           let jobAdDetails = {};
//           // console.log(jobAdDetails, "==>>jobAdDetails");
//           if (designation && description && skills && companyName) {
//             jobAdDetails = {
//               designation,
//               description,
//               companyName,
//               skills,
//               experience,
//               payRangeStart,
//               payRangeEnd,
//               jobFeseability,
//               jobType,
//               country,
//               city,
//               hashTags,
//               applyEmail,
//               applyPhone,
//             };
//           } else {
//             return res.status(400).send(
//               sendError({
//                 status: false,
//                 message: "All Fields are required",
//               })
//             );
//           }

//           // console.log(jobAdDetails, "==>>> jobAdDetails");

//           const jobAd = new JobAd(jobAdDetails);
//           await jobAd.save();
//           console.log(jobAd);

//           //here is all emails in array format
//           const emails = extractEmails(description);
//           // console.log("Emails:", emails);

//           //here is all contact numbers in array format
//           const contactNumbers = extractPhoneNumbers(description);
//           // console.log("Contact Numbers:", contactNumbers);

//           const otpPromises = emails.map(async (email, index) => {
//             const contactNumber = contactNumbers[index];
//             const otp = randomatic("0", 6);

//             const otpAddToDb = await JobAd.updateOne(
//               { _id: jobAd._id },
//               {
//                 $push: {
//                   emailOTP: {
//                     Email: email,
//                     OTP: otp,
//                   },
//                 },
//               }
//             );

//             if (!otpAddToDb) {
//               return res.status(400).send({
//                 status: "Failed",
//                 message: "JobAd not found or OTP not added",
//               });
//             }

//             try {
//               await jobAd.save();

//               // Send OTP via email
//               const emailResponse = await sendEmailOTP(email, otp);
//               console.log(emailResponse);

//               // Send OTP via SMS
//               // const smsResponse = await sendSMSOTP(contactNumber, otp);
//               // console.log(smsResponse);
//             } catch (error) {
//               console.log(error);
//             }
//           });

//           // Wait for all OTPs to be generated and saved
//           await Promise.all(otpPromises);

//           res.status(200).send({
//             status: "Success",
//             message: "Job application received, and OTPs sent successfully!",
//             data: jobAd,
//           });
//         } catch (error) {
//           console.error("Error:", error);
//           res.status(500).send({
//             status: "Error",
//             message: "Internal Server Error",
//           });
//         }

// }

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
        otp
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
