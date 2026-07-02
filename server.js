// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const app = express();

// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "OPTIONS"],
//   allowedHeaders: ["Content-Type"]
// }));

// app.use(express.json());

// app.options("/enquiry", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   return res.sendStatus(204);
// });

// app.get("/", (req, res) => {
//   res.send("Backend working");
// });


// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // Schema
// const enquirySchema = new mongoose.Schema({
//   name: String,
//   city: String,
//   email: String,
//   phone: String,
//   whatsapp: String,
//   destination: String,
//   date: String,
//   people: String,
//   vacation: String
// });

// const Enquiry = mongoose.model("Enquiry", enquirySchema);

// // Mail Setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "skyvoratrips@gmail.com",
//     pass: "jlvn ocue bxub tiua"
//   }
// });

// // API
// app.post("/enquiry", async (req, res) => {
//   try {

//     const enquiry = new Enquiry(req.body);
//     await enquiry.save();

//     await transporter.sendMail({
//       from: "skyvoratrips@gmail.com",
//       to: "skyvoratrips@gmail.com",
//       subject: "New Travel Enquiry",
//       html: `
//         <h2>New Enquiry Received</h2>

//         <p><b>Name:</b> ${req.body.name}</p>
//         <p><b>City:</b> ${req.body.city}</p>
//         <p><b>Email:</b> ${req.body.email}</p>
//         <p><b>Phone:</b> ${req.body.phone}</p>
//         <p><b>WhatsApp:</b> ${req.body.whatsapp}</p>
//         <p><b>Destination:</b> ${req.body.destination}</p>
//         <p><b>Date:</b> ${req.body.date}</p>
//         /* <p><b>People:</b> ${req.body.people}</p>
//         <p><b>Vacation:</b> ${req.body.vacation}</p> */
//       `
//     });

//     res.status(200).json({
//       message: "Enquiry Saved Successfully"
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Error"
//     });
//   }
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log('Server running on port ${PORT}');
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");
// const dns = require("dns");
// dns.setDefaultResultOrder("ipv4first");
// require("dotenv").config();

// const app = express();

// const cors = require("cors");

// app.use(cors({
//   origin: "https://skyvoratravels.vercel.app",
//   methods: ["GET", "POST", "OPTIONS"],
//   allowedHeaders: ["Content-Type"],
// }));


// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Backend working");
// });

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("MongoDB Error:", err));

// const enquirySchema = new mongoose.Schema({
//   name: String,
//   city: String,
//   email: String,
//   phone: String,
//   whatsapp: String,
//   destination: String,
//   date: String,
//   people: String
// });

// const Enquiry = mongoose.model("Enquiry", enquirySchema);

// const transporter = nodemailer.createTransport({
  
//   service: "gmail",
  
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
   
// });

// app.post("/enquiry", async (req, res) => {
//   try {
//     await Enquiry.create(req.body);
    
//     await transporter.sendMail({
//       from: `Skyvora Trips <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       replyTo: req.body.email,
//       subject: "New Travel Enquiry",
//       html: `
//         <h2>New Enquiry Received</h2>
//         <p><b>Name:</b> ${req.body.name}</p>
//         <p><b>City:</b> ${req.body.city}</p>
//         <p><b>Email:</b> ${req.body.email}</p>
//         <p><b>Phone:</b> ${req.body.phone}</p>
//         <p><b>WhatsApp:</b> ${req.body.whatsapp}</p>
//         <p><b>Destination:</b> ${req.body.destination}</p>
//         <p><b>Date:</b> ${req.body.date}</p>
//         <p><b>People:</b> ${req.body.people}</p>
//       `
//     });
    

//     res.status(200).json({ message: "Enquiry saved and mail sent" });
//   } 
//   catch (err) {
//     console.error("Enquiry Error:", err.message);
//     res.status(500).json({ message: "Failed to send enquiry email" });
//   }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { Resend } = require("resend");
const resend = new 
Resend(process.env.RESEND_API_KEY);


const app = express();

app.use(cors({
  origin: "https://skyvoratravels.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.options("/enquiry", cors({
  origin: "https://skyvoratravels.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working");
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

const enquirySchema = new mongoose.Schema({
  name: String,
  city: String,
  email: String,
  phone: String,
  whatsapp: String,
  destination: String,
  date: String,
  people: String
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   family: 4,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
//   tls: {
//     servername: "smtp.gmail.com",
//     rejectUnauthorized: false
//   }
// });

app.post("/enquiry", async (req, res) => {
  try {
    console.log("BODY:",req.body);
    await Enquiry.create(req.body);
    console.log("Database Saved")
    await resend.emails.send({
      from: `"Skyvora Trips" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: req.body.email,
      subject: "New Travel Enquiry",
      html: `
        <h2>New Travel Enquiry</h2>
        <p><b>Name:</b> ${req.body.name}</p>
        <p><b>City:</b> ${req.body.city}</p>
        <p><b>Email:</b> ${req.body.email}</p>
        <p><b>Phone:</b> ${req.body.phone}</p>
        <p><b>WhatsApp:</b> ${req.body.whatsapp}</p>
        <p><b>Destination:</b> ${req.body.destination}</p>
        <p><b>Date:</b> ${req.body.date}</p>
        <p><b>People:</b> ${req.body.people}</p>
      `
    });

    res.status(200).json({
      message: "Enquiry submitted successfully. Mail sent to owner."
    });

  } catch (err) {
    console.error("Enquiry Error:", err);
    res.status(500).json({
      message: err.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});