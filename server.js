const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.use(cors({
   origin: [
    "http://localhost:4200",
    "https://skyvoratravels.vercel.app"
  ],
  methods: ["GET", "POST","OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));
app.options("*",cors())
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const enquirySchema = new mongoose.Schema({
  name: String,
  city: String,
  email: String,
  phone: String,
  whatsapp: String,
  destination: String,
  date: String,
  people: String,
  vacation: String
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

// Mail Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skyvoratrips@gmail.com",
    pass: "jlvn ocue bxub tiua"
  }
});

// API
app.post("/enquiry", async (req, res) => {
  try {

    const enquiry = new Enquiry(req.body);
    await enquiry.save();

    await transporter.sendMail({
      from: "skyvoratrips@gmail.com",
      to: "skyvoratrips@gmail.com",
      subject: "New Travel Enquiry",
      html: `
        <h2>New Enquiry Received</h2>

        <p><b>Name:</b> ${req.body.name}</p>
        <p><b>City:</b> ${req.body.city}</p>
        <p><b>Email:</b> ${req.body.email}</p>
        <p><b>Phone:</b> ${req.body.phone}</p>
        <p><b>WhatsApp:</b> ${req.body.whatsapp}</p>
        <p><b>Destination:</b> ${req.body.destination}</p>
        <p><b>Date:</b> ${req.body.date}</p>
        /* <p><b>People:</b> ${req.body.people}</p>
        <p><b>Vacation:</b> ${req.body.vacation}</p> */
      `
    });

    res.status(200).json({
      message: "Enquiry Saved Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

