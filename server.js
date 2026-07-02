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
const nodemailer = require("nodemailer");
const dns = require("dns");
const cors = require("cors");
require("dotenv").config();

dns.setDefaultResultOrder("ipv4first");

const app = express();

app.use(cors({
  origin: "[skyvoratravels.vercel.app](https://skyvoratravels.vercel.app)",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working");
});

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  whatsapp: { type: String, trim: true, default: "" },
  destination: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  people: { type: String, required: true, trim: true },
}, { timestamps: true });

const Enquiry = mongoose.model("Enquiry", enquirySchema);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port:587,
  secure: false,
  requireTLS:true,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Mail transporter error:", error);
  } else {
    console.log("Mail transporter is ready");
  }
});

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.post("/enquiry", async (req, res) => {
  try {
    const {
      name,
      city,
      email,
      phone,
      whatsapp,
      destination,
      date,
      people
    } = req.body;

    if (!name || !city || !email || !phone || !destination || !date || !people) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const enquiryData = {
      name: name.trim(),
      city: city.trim(),
      email: email.trim(),
      phone: phone.trim(),
      whatsapp: (whatsapp || "").trim(),
      destination: destination.trim(),
      date: date.trim(),
      people: people.trim(),
    };

    await Enquiry.create(enquiryData);

    await transporter.sendMail({
      from: `Skyvora Trips <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: enquiryData.email,
      subject: "New Travel Enquiry",
      html: `
        <h2>New Enquiry Received</h2>
        <p><b>Name:</b> ${escapeHtml(enquiryData.name)}</p>
        <p><b>City:</b> ${escapeHtml(enquiryData.city)}</p>
        <p><b>Email:</b> ${escapeHtml(enquiryData.email)}</p>
        <p><b>Phone:</b> ${escapeHtml(enquiryData.phone)}</p>
        <p><b>WhatsApp:</b> ${escapeHtml(enquiryData.whatsapp)}</p>
        <p><b>Destination:</b> ${escapeHtml(enquiryData.destination)}</p>
        <p><b>Date:</b> ${escapeHtml(enquiryData.date)}</p>
        <p><b>People:</b> ${escapeHtml(enquiryData.people)}</p>
      `,
    });

    return res.status(200).json({ message: "Enquiry saved and mail sent" });
  } catch (err) {
    console.error("Enquiry Error Full:", err);
    return res.status(500).json({
      message: "Failed to save enquiry or send email",
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

