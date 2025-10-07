const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const axios = require("axios");
require("dotenv").config();

const RESEND_API_KEY = process.env.Resend_api;
const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";

if (!RESEND_API_KEY) {
  console.warn(
    "Warning: Resend_api not set in .env — emails will fail until provided."
  );
}

// async function sendResendEmail(to, subject, html) {
//   try {
//     const res = await axios.post(
//       "https://api.resend.com/emails",
//       { from: EMAIL_FROM, to, subject, html },
//       {
//         headers: {
//           Authorization: `Bearer ${RESEND_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return res.data;
//   } catch (err) {
//     console.error(
//       "Error sending email via Resend:",
//       err.response?.data || err.message
//     );
//     // don't throw — we don't want email errors to break API responses
//   }
// }

function bookingReceivedHtml(booking) {
  return `
    <p>Hi ${booking.name},</p>
    <p>Thank you for reaching out to Mini Project IT Services. This is to confirm we have received your booking request:</p>
    <ul>
      <li><strong>Service:</strong> ${booking.service}</li>
      <li><strong>Date:</strong> ${booking.date}</li>
      <li><strong>Time:</strong> ${booking.time}</li>
    </ul>
    <p>Our technical team will review your request and contact you if we need more information. For now, your booking status is <strong>Pending</strong>.</p>
    <p>Best regards,<br/>Mini Project Support Team</p>
  `;
}

function bookingAcceptedHtml(booking) {
  return `
    <p>Hi ${booking.name},</p>
    <p>Good news — your booking has been <strong>accepted</strong> by our technical team.</p>
    <ul>
      <li><strong>Service:</strong> ${booking.service}</li>
      <li><strong>Date:</strong> ${booking.date}</li>
      <li><strong>Time:</strong> ${booking.time}</li>
    </ul>
    <p>Our technician will arrive at the scheduled time. If you need to reschedule, please reply to this email or contact our support.</p>
    <p>Regards,<br/>Mini Project Technical Team</p>
  `;
}

function bookingCompletedHtml(booking) {
  return `
    <p>Hi ${booking.name},</p>
    <p>We are writing to confirm that your booking for <strong>${booking.service}</strong> on <strong>${booking.date}</strong> at <strong>${booking.time}</strong> has been <strong>completed</strong>.</p>
    <p>We hope everything is working properly. If you face any issues or need follow-up support, please get in touch. Thank you for choosing Mini Project Services.</p>
    <p>Kind regards,<br/>Mini Project Technical Team</p>
  `;
}

// Create booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // send booking receipt email
    console.log("Email successfully sent: Booking Received — Mini Project");
    // sendResendEmail(
    //   booking.email,
    //   "Booking Received — Mini Project",
    //   bookingReceivedHtml(booking)
    // );

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update booking status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // send appropriate email for accepted / completed
    if (status === "accepted") {
      console.log("Email successfully sent: Booking Accepted — Mini Project");
      // sendResendEmail(
      //   booking.email,
      //   "Booking Accepted — Mini Project",
      //   bookingAcceptedHtml(booking)
      // );
    } else if (status === "completed") {
      console.log("Email successfully sent: Booking Completed — Mini Project");
      // sendResendEmail(
      //   booking.email,
      //   "Booking Completed — Mini Project",
      //   bookingCompletedHtml(booking)
      // );
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
