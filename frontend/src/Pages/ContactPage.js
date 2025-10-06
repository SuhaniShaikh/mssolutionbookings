import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock } from 'react-icons/fa';
import '../styles/contact.css';

export default function ContactPage() {
  return (
    <div className="contact">
      {/* Contact Content - Centered */}
      <section className="contact__center">
        <div className="contact__container">
          <div className="contact-card">
            <h2 className="contact-card__title">Contact Information</h2>
            
            <div className="contact-list">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-item__icon" />
                <div>
                  <h3 className="contact-item__heading">Address</h3>
                  <p className="contact-item__text">Shanta Durga Sankul, Maharastra State Highway 116, Manganwlar Peth Mangalwar Peth, 416002, 650, near new devak club, B Ward, Manganwlar Peth, Kolhapur, Maharashtra 416012</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaPhone className="contact-item__icon" />
                <div>
                  <h3 className="contact-item__heading">Phone</h3>
                  <p className="contact-item__text">+91 9270514222</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaWhatsapp className="contact-item__icon" />
                <div>
                  <h3 className="contact-item__heading">WhatsApp</h3>
                  <p className="contact-item__text">+91 9145657674</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaEnvelope className="contact-item__icon" />
                <div>
                  <h3 className="contact-item__heading">Email</h3>
                  <p className="contact-item__text">nitin.bhosle@ymail.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaClock className="contact-item__icon" />
                <div>
                  <h3 className="contact-item__heading">Working Hours</h3>
                  <p className="contact-item__text">7 AM – 10 PM (Mon – Sun)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="contact-cta">
        <div className="contact-cta__container">
          <h2 className="contact-cta__title">Need urgent support?</h2>
          <div className="contact-cta__actions">
            <a 
              href="tel:+919145657674"
              className="btn btn--light"
            >
              <FaPhone className="btn__icon" /> Call Now
            </a>
            <a 
              href="https://wa.me/9145657674"
              className="btn btn--whatsapp"
            >
              <FaWhatsapp className="btn__icon" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
     
    </div>
  );
}