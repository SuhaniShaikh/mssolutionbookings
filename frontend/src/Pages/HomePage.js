import { FaTools, FaRocket, FaLaptop, FaHandshake } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const HomePage = () => {
  const services = [
    { icon: <FaLaptop className="service-icon" />, title: "Laptop/Desktop Repair", desc: "Expert repairs for all brands and models" },
    { icon: <FaTools className="service-icon" />, title: "Printer Repair", desc: "Fix & toner refill for all printer types" },
    { icon: <FaLaptop className="service-icon" />, title: "Antivirus Setup", desc: "Complete virus protection installation" },
    { icon: <FaTools className="service-icon" />, title: "Office IT Setup", desc: "Complete IT infrastructure for businesses" }
  ];

  const testimonials = [
    { name: "~ seeta wines", quote: "Best support provider for our it asset , routine checkup and maintenance done by him from last two years, we highly recommended for all it servies", rating: 5 },
    { name: "~ PN DISTRIBUTORS", quote: "Professional service provider. We have been dealing for the last 10 years. Highly recommended.", rating: 5 }
  ];

  // Star rating component
  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rating) ? (
          <FiStar key={i} className="star-filled" />
        ) : (
          <FiStar key={i} className="star-empty" />
        )
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          {/* <Image
            src="/tech-banner.jpg"
            alt="Technician working on laptop"
            fill
            className="object-cover"
          /> */}
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Reliable IT Solutions for Homes, Schools & Businesses
          </h1>
          <p className="hero-subtitle">
            From laptop repairs to complete hardware setups – we've got you covered.
          </p>
          <div className="hero-buttons">
            <Link to="/services" className="hero-btn-primary">
              Explore Services
            </Link>
            <Link to="/booking" className="hero-btn-secondary">
              Book a Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <h2 className="why-choose-title">Why Choose M.S Infocare</h2>
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <FaTools className="why-choose-icon" />
              <h3 className="why-choose-card-title">10+ Years of Experience</h3>
              <p className="why-choose-card-desc">Trusted expertise since 2012</p>
            </div>
            <div className="why-choose-card">
              <FaRocket className="why-choose-icon" />
              <h3 className="why-choose-card-title">Fast Home & Office Visits</h3>
              <p className="why-choose-card-desc">Same-day service available</p>
            </div>
            <div className="why-choose-card">
              <FaLaptop className="why-choose-icon" />
              <h3 className="why-choose-card-title">Complete Hardware Solutions</h3>
              <p className="why-choose-card-desc">From parts to full setup</p>
            </div>
            <div className="why-choose-card">
              <FaHandshake className="why-choose-icon" />
              <h3 className="why-choose-card-title">Trusted by Schools & Corporates</h3>
              <p className="why-choose-card-desc">Reliable institutional partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="services-section">
        <div className="services-container">
          <h2 className="services-title">Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div>{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/services" className="services-btn">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-image-container">
              <div className="about-image">
                {/* <Image 
                  // src="/team-working.jpg" 
                  alt="M.S Infocare team working"
                  fill
                  className="object-cover"
                /> */}
              </div>
            </div>
            <div className="about-text-container">
              <h2 className="about-title">About M.S Infocare</h2>
              <p className="about-text">
                M.S Infocare is your one-stop tech support partner. With over a decade of experience, we provide reliable and affordable solutions for homes, schools, and businesses.
              </p>
              <p className="about-text-secondary">
                Our certified technicians are equipped to handle all your IT needs, from simple laptop repairs to complete office network setups. We pride ourselves on honest service and transparent pricing.
              </p>
              <Link to="/about" className="about-btn">
                Know More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="testimonials-title">What Our Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <StarRating rating={testimonial.rating} />
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <p>{testimonial.name}</p>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials-cta">
            <Link to="/testimonials" className="testimonials-btn">
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Need Quick Tech Help? We're Just a Call Away!</h2>
          <Link to="/booking" className="cta-btn">
            Book a Service Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;