import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/booking.css";

const BookingPage = () => {
  const services = [
    { name: "Laptop & Desktop Repair", price: "₹499" },
    { name: "Printer Repair & Toner Refill", price: "₹299" },
    { name: "School/Office Setup", price: "₹1,999" },
    { name: "Antivirus & OS Installations", price: "₹399" },
    { name: "AMC & Scheduled Maintenance", price: "₹999/month" },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [selectedServicePrice, setSelectedServicePrice] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Update price when service changes
    if (name === "service") {
      const selectedService = services.find(
        (service) => service.name === value
      );
      setSelectedServicePrice(selectedService ? selectedService.price : "");
    }
  };

  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      alert(
        "Please agree to the price variation terms to proceed with booking."
      );
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...formData,
        price: selectedServicePrice,
      });
      alert(
        "Booking request submitted successfully! We will contact you soon."
      );
      setFormData({
        name: "",
        email: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
      setSelectedServicePrice("");
      setAgreeToTerms(false);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error submitting booking. Please try again.");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1 className="booking-title">Book Your Service</h1>
          <p className="booking-subtitle">
            Schedule your IT service appointment with M.S Infocare
          </p>
        </div>

        <div className="booking-form-container">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="service" className="form-label">
                Select Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Choose a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service.name}>
                    {service.name} - {service.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Display selected service price */}
            {selectedServicePrice && (
              <div className="price-display">
                <p className="price-text">
                  Service Cost:{" "}
                  <span className="price-amount">{selectedServicePrice}</span>
                </p>
                <p className="price-note">
                  *Final cost may vary based on actual service requirements
                </p>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  Preferred Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Address Info
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="4"
                placeholder="Please provide your address details..."
              />
            </div>

            {/* Checkbox for price agreement */}
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={handleCheckboxChange}
                  className="checkbox-input"
                />
                <span className="checkmark"></span>I understand that the final
                price may change based on actual diagnosis, part replacement
                costs, and service complexity.
              </label>

            <button type="submit" className="booking-submit-btn">
              Book Appointment
            </button>
          </form>
        </div>

        <div className="booking-footer">
          <p>
            Need immediate assistance?{" "}
            <Link to="/contact" className="booking-contact-link">
              Contact us directly
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
