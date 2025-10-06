"use client"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaCheck, FaTimes, FaPhone, FaHome, FaSchool, FaBriefcase, FaStore, FaHotel } from 'react-icons/fa';
import '../styles/services.css';

export default function ServicesPage() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const services = [
    {
      title: "Laptop & Desktop Repair",
      description: "Fast diagnosis, OS fixes, part replacement — we fix it all, wherever you are. Our technicians handle all brands and models with precision and care."
    },
    {
      title: "Printer Repair & Toner Refill",
      description: "Complete solutions for printer glitches, toner issues, and setup needs. We service all major brands and provide genuine toner refills."
    },
    {
      title: "School/Office Setup",
      description: "Full hardware setup for institutions — from cabling to system configuration. We create efficient IT environments tailored to your needs."
    },
    {
      title: "Antivirus & OS Installations",
      description: "Stay protected with reliable antivirus and up-to-date operating systems. We install and configure security solutions for optimal protection."
    },
    {
      title: "AMC & Scheduled Maintenance",
      description: "Monthly checkups to keep your IT running smooth — perfect for busy offices. Prevent issues before they disrupt your workflow."
    }
  ];

  const comparisonData = [
    { feature: "Technician Visit Time", oneTime: "As needed", amc: "Scheduled" },
    { feature: "Cost Efficiency", oneTime: "Varies", amc: "Budget Friendly" },
    { feature: "Ideal For", oneTime: "Homes, Urgency", amc: "Offices, Schools" },
    { feature: "Long-Term Support", oneTime: <FaTimes className="comparison-icon comparison-icon--negative" />, amc: <FaCheck className="comparison-icon comparison-icon--positive" /> }
  ];

  const clientTypes = [
    {
      icon: <FaHome />,
      title: "Home Users",
      description: "Simple, affordable solutions for your everyday laptop, PC, or printer issues — right at your doorstep."
    },
    {
      icon: <FaSchool />,
      title: "Schools & Institutes",
      description: "Bulk setup, lab maintenance, and monthly checkups to keep learning uninterrupted."
    },
    {
      icon: <FaBriefcase />,
      title: "Small Offices",
      description: "Efficient, reliable IT services tailored for workspaces that can't afford downtime."
    },
    {
      icon: <FaStore />,
      title: "Retail Shops",
      description: "From billing system setup to antivirus protection — we make your shop tech-ready."
    },
    {
      icon: <FaHotel />,
      title: "Hotels & Hospitality",
      description: "Smooth tech environments for your guests — printer setup, surveillance, WiFi & more."
    }
  ];

  return (
    <div className="services">
      {/* Accordion Services */}
      <section className="section--padded">
        <div className="section__container section__container--narrow">
          <h2 className="section__title">Our Services</h2>
          <div className="accordion">
            {services.map((service, index) => (
              <div key={index} className="accordion-card">
                <button
                  className={`accordion-header${activeAccordion === index ? ' is-active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="accordion-title">{service.title}</h3>
                  {activeAccordion === index ? (
                    <FaChevronUp className="accordion-icon" />
                  ) : (
                    <FaChevronDown className="accordion-icon" />
                  )}
                </button>
                {activeAccordion === index && (
                  <div className="accordion-content">
                    <p>{service.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="section--muted section--padded">
        <div className="section__container">
          <h2 className="section__title">
            One-Time Repairs vs Ongoing Maintenance: What's Right for You?
          </h2>
          <div className="section__container section__container--narrow table-scroll">
            <table className="comparison-table">
              <thead>
                <tr className="border-b border-gray-200">
                  <th>Feature</th>
                  <th>One-Time Repair</th>
                  <th>AMC Service</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td>{row.feature}</td>
                    <td>{row.oneTime}</td>
                    <td>{row.amc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Client Type Icon Grid Section */}
      <section className="section--padded section--muted">
        <div className="section__container">
          <div className="text-center mb-12">
            <h2 className="section__title" style={{ marginBottom: '1rem' }}>Who We Serve</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a home user or running a full organization – our expert tech support is tailored to your needs.
            </p>
          </div>

          <div className="client-grid">
            {clientTypes.map((client, index) => (
              <div key={index} className="client-group">
                <div className="client-card">
                  <div className="client-icon">
                    {client.icon}
                  </div>
                  <h3 className="client-title">{client.title}</h3>
                </div>
                <div className="client-tooltip">
                  <p>{client.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section--padded">
        <div className="section__container">
          <h2 className="cta__title">
            Still Not Sure What You Need? We'll Help You Figure It Out.
          </h2>
          <Link
            to="/contact"
            className="cta__button"
          >
            <span className="cta__button-row">
              <FaPhone className="cta__icon-spacer" /> Contact Us Now
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}