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

async function sendResendEmail(to, subject, html) {
  try {
    const res = await axios.post(
      "https://api.resend.com/emails",
      { from: EMAIL_FROM, to, subject, html },
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(
      "Error sending email via Resend:",
      err.response?.data || err.message
    );
    // don't throw — we don't want email errors to break API responses
  }
}
function bookingReceivedHtml(booking) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2c3e50, #34495e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3498db; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; color: #7f8c8d; font-size: 14px; }
        .status-badge { background: #f39c12; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>M.S. Solutions</h1>
          <p>IT Services & Technical Support</p>
        </div>
        <div class="content">
          <h2>Booking Request Received</h2>
          <p>Dear ${booking.name},</p>
          
          <p>Thank you for choosing <strong>M.S. Solutions</strong> for your IT service needs. We have successfully received your booking request and it's now in our system.</p>
          
          <div class="booking-details">
            <h3 style="margin-top: 0; color: #2c3e50;">Booking Details:</h3>
            <p><strong>Service Requested:</strong> ${booking.service}</p>
            <p><strong>Scheduled Date:</strong> ${booking.date}</p>
            <p><strong>Preferred Time:</strong> ${booking.time}</p>
            <p><strong>Estimated Cost:</strong> ${
              booking.price || "To be confirmed after diagnosis"
            }</p>
            <p><strong>Booking Reference:</strong> MS${Date.now()
              .toString()
              .slice(-6)}</p>
          </div>

          <p><span class="status-badge">CURRENT STATUS: PENDING REVIEW</span></p>
          
          <p>Our technical team will review your request within 24 hours and contact you to:</p>
          <ul>
            <li>Confirm the appointment</li>
            <li>Discuss any specific requirements</li>
            <li>Provide final cost estimation</li>
          </ul>

          <p><strong>What happens next?</strong><br>
          You'll receive another email once our team accepts and schedules your booking. For urgent inquiries, please call us at <strong>+91-XXXXXXXXXX</strong>.</p>

          <p>Best Regards,<br>
          <strong>Customer Support Team</strong><br>
          M.S. Solutions<br>
          Email: support@mssolutions.com<br>
          Phone: +91-XXXXXXXXXX</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 M.S. Solutions. All rights reserved.<br>
          Transforming Technology, Empowering Businesses</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function bookingAcceptedHtml(booking) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #27ae60; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; color: #7f8c8d; font-size: 14px; }
        .status-badge { background: #27ae60; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; }
        .technician-info { background: #e8f6f3; padding: 15px; border-radius: 8px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>M.S. Solutions</h1>
          <p>IT Services & Technical Support</p>
        </div>
        <div class="content">
          <h2>Booking Confirmed! 🎉</h2>
          <p>Dear ${booking.name},</p>
          
          <p>Great news! Your service booking has been <strong>accepted and confirmed</strong> by our technical team at <strong>M.S. Solutions</strong>.</p>
          
          <div class="booking-details">
            <h3 style="margin-top: 0; color: #2c3e50;">Confirmed Appointment Details:</h3>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Confirmed Date:</strong> ${booking.date}</p>
            <p><strong>Time Slot:</strong> ${booking.time}</p>
            <p><strong>Service Charge:</strong> ${
              booking.price || "Will be confirmed after diagnosis"
            }</p>
            <p><strong>Booking ID:</strong> MS${Date.now()
              .toString()
              .slice(-6)}</p>
          </div>

          <p><span class="status-badge">STATUS: CONFIRMED</span></p>

          <div class="technician-info">
            <h4 style="margin-top: 0; color: #27ae60;">What to Expect:</h4>
            <p>✓ Our certified technician will arrive at your location during the scheduled time<br>
            ✓ Please ensure someone is available at the address provided<br>
            ✓ Have any relevant documents/credentials ready<br>
            ✓ Estimated service duration: 1-3 hours (depending on complexity)</p>
          </div>

          <p><strong>Important Notes:</strong></p>
          <ul>
            <li>Final pricing may vary based on actual diagnosis and part requirements</li>
            <li>Please keep your phone accessible for any coordination</li>
            <li>For rescheduling or cancellation, please contact us at least 6 hours in advance</li>
          </ul>

          <p>We're excited to serve you and ensure your IT systems are running optimally!</p>

          <p>Warm Regards,<br>
          <strong>Technical Operations Team</strong><br>
          M.S. Solutions<br>
          📞 +91-XXXXXXXXXX | ✉️ support@mssolutions.com<br>
          🕒 Business Hours: Mon-Sat, 9:00 AM - 6:00 PM</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 M.S. Solutions. All rights reserved.<br>
          Your Trusted IT Partner</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function bookingCompletedHtml(booking) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #9b59b6, #8e44ad); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .service-summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9b59b6; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; color: #7f8c8d; font-size: 14px; }
        .status-badge { background: #9b59b6; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; }
        .feedback { background: #f4ecf7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>M.S. Solutions</h1>
          <p>IT Services & Technical Support</p>
        </div>
        <div class="content">
          <h2>Service Successfully Completed! ✅</h2>
          <p>Dear ${booking.name},</p>
          
          <p>We're pleased to inform you that your <strong>${
            booking.service
          }</strong> has been successfully completed by our technical team.</p>
          
          <div class="service-summary">
            <h3 style="margin-top: 0; color: #2c3e50;">Service Completion Summary:</h3>
            <p><strong>Service Provided:</strong> ${booking.service}</p>
            <p><strong>Completion Date:</strong> ${booking.date}</p>
            <p><strong>Service Time:</strong> ${booking.time}</p>
            <p><strong>Technician Notes:</strong> All issues resolved and system tested</p>
            <p><strong>Service ID:</strong> MS${Date.now()
              .toString()
              .slice(-6)}</p>
          </div>

          <p><span class="status-badge">STATUS: COMPLETED</span></p>

          <p><strong>What was done:</strong><br>
          Our technician has thoroughly addressed your service requirements, performed necessary repairs/installations, and ensured everything is functioning optimally.</p>

          <div class="feedback">
            <h4 style="color: #8e44ad; margin-top: 0;">How Was Your Experience?</h4>
            <p>We value your feedback! Please take a moment to rate our service and help us improve.</p>
            <p>📝 <a href="#" style="color: #8e44ad; text-decoration: none; font-weight: bold;">Share Your Feedback</a></p>
          </div>

          <p><strong>Warranty & Support:</strong><br>
          • 30-day service warranty on labor<br>
          • 90-day warranty on replaced parts (if applicable)<br>
          • Free follow-up support for any related issues</p>

          <p><strong>Need Further Assistance?</strong><br>
          We're here to help! Contact us for any follow-up support or new service requirements.</p>

          <p>Thank you for trusting <strong>M.S. Solutions</strong> with your IT needs. We look forward to serving you again!</p>

          <p>Best Regards,<br>
          <strong>Service Delivery Team</strong><br>
          M.S. Solutions<br>
          📞 +91-XXXXXXXXXX | ✉️ support@mssolutions.com<br>
          🌐 www.mssolutions.com</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 M.S. Solutions. All rights reserved.<br>
          Excellence in IT Solutions</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Additional function for booking rejection/cancellation
function bookingRejectedHtml(booking, reason) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e74c3c; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; color: #7f8c8d; font-size: 14px; }
        .status-badge { background: #e74c3c; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>M.S. Solutions</h1>
          <p>IT Services & Technical Support</p>
        </div>
        <div class="content">
          <h2>Booking Update</h2>
          <p>Dear ${booking.name},</p>
          
          <p>Regarding your booking request for <strong>${booking.service}</strong>, we regret to inform you that we are unable to proceed with this service at the moment.</p>
          
          <div class="booking-details">
            <h3 style="margin-top: 0; color: #2c3e50;">Booking Details:</h3>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Requested Date:</strong> ${booking.date}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Reason:</strong> ${reason}</p>
          </div>

          <p><span class="status-badge">STATUS: CANCELLED</span></p>

          <p><strong>Alternative Solutions:</strong><br>
          We recommend contacting us directly to discuss alternative options or reschedule for a later date when the service becomes available.</p>

          <p>We apologize for any inconvenience caused and hope to serve you better in the future.</p>

          <p>Sincerely,<br>
          <strong>Customer Support Team</strong><br>
          M.S. Solutions<br>
          📞 +91-XXXXXXXXXX | ✉️ support@mssolutions.com</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 M.S. Solutions. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Create booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // send booking receipt email
    // console.log("Email successfully sent: Booking Received — Mini Project");
    sendResendEmail(
      booking.email,
      "Booking Received — Mini Project",
      bookingReceivedHtml(booking)
    );

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
      // console.log("Email successfully sent: Booking Accepted — Mini Project");
      sendResendEmail(
        booking.email,
        "Booking Accepted — Mini Project",
        bookingAcceptedHtml(booking)
      );
    } else if (status === "completed") {
      // console.log("Email successfully sent: Booking Completed — Mini Project");
      sendResendEmail(
        booking.email,
        "Booking Completed — Mini Project",
        bookingCompletedHtml(booking)
      );
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
