import { FaTools, FaComments, FaUserShield, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/about.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section with Profile Image */}
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-content">
            {/* Profile Image - Round */}
            <div className="about-profile-image">
              <div className="about-profile-circle">
                {/* <img
                  src="/founder-profile.png"
                  alt="Founder of M.S Infocare"
                  className="about-profile-img"
                /> */}
              </div>
            </div>

            {/* Introduction Text */}
            <div className="about-hero-text">
              <h1 className="about-hero-title">
                Meet the Man Behind M.S Infocare
              </h1>
              <p className="about-hero-quote">
                "I'm Nithin Bhosle, the founder, technician, and full-time tech
                whisperer behind M.S Infocare. I've spent over a decade helping
                people fix, upgrade, and protect their devices — all with care
                and commitment."
              </p>
              <div className="about-divider"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Mission */}
      <section className="about-mission">
        <div className="about-container">
          <p className="about-mission-text">
            "M.S Infocare is more than just a service – it's my personal
            mission. I started this company to bring reliable, friendly, and
            affordable IT support to homes, schools, and offices. I don't just
            fix devices; I fix frustrations."
          </p>
        </div>
      </section>

      {/* Founder Values */}
      <section className="about-values">
        <div className="about-container">
          <h2 className="about-section-title">My Approach to Service</h2>
          <div className="about-values-grid">
            <div className="about-value-card">
              <FaTools className="about-value-icon" />
              <h3 className="about-value-title">Experience-Driven</h3>
              <p className="about-value-description">
                Years of hands-on repairs and building client trust through
                reliable service.
              </p>
            </div>
            <div className="about-value-card">
              <FaComments className="about-value-icon" />
              <h3 className="about-value-title">Clear Communication</h3>
              <p className="about-value-description">
                You talk to me directly — no middlemen, no confusing tech
                jargon.
              </p>
            </div>
            <div className="about-value-card">
              <FaUserShield className="about-value-icon" />
              <h3 className="about-value-title">Quality Focus</h3>
              <p className="about-value-description">
                Every job gets my full attention and precision workmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="about-container about-timeline-content">
          <h2 className="about-section-title">A Glimpse Into My Journey</h2>
          <div>
            <div className="about-timeline-item">
              <div className="about-timeline-year">2010</div>
              <div className="about-timeline-text">
                <h3>Started as Freelance Tech</h3>
                <p>
                  Began repairing laptops and computers for local clients in my
                  community.
                </p>
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-year">2015</div>
              <div className="about-timeline-text">
                <h3>Founded M.S Infocare</h3>
                <p>
                  Established my own business to serve more clients with
                  comprehensive IT solutions.
                </p>
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-year">2018</div>
              <div className="about-timeline-text">
                <h3>Expanded Services</h3>
                <p>
                  Began offering AMC contracts and business-wide IT
                  infrastructure solutions.
                </p>
              </div>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-year">2024</div>
              <div className="about-timeline-text">
                <h3>800+ Happy Clients</h3>
                <p>
                  Proud to have personally helped hundreds of homes and
                  businesses with their tech needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-container">
          <h2 className="about-cta-title">
            Let's Solve Your Tech Problems Together
          </h2>
          <Link to="/contact" className="about-cta-button">
            <span className="about-cta-button-content">
              <FaPhone className="about-cta-icon" /> Contact Me Now
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
