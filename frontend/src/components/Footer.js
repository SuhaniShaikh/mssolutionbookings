import { Link } from 'react-router-dom';
import { FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FiStar, FiClock } from 'react-icons/fi';
import './footer.css';
export default function Footer(){
    return (
      <div className="footer">
        <div className="footer__container">
          <div className="footer__grid">
            <div>
              <h3 className="footer__title-lg">M.S Infocare</h3>
              <p className="footer__text-muted">Your trusted IT solutions provider since 2012.</p>
            </div>
            <div>
              <h4 className="footer__title-lg">Quick Links</h4>
              <ul className="footer__list">
                <li><Link to="/" className="footer__link">Home</Link></li>
                <li><Link to="/about" className="footer__link">About</Link></li>
                <li><Link to="/services" className="footer__link">Services</Link></li>
                <li><Link to="/testimonials" className="footer__link">Testimonials</Link></li>
                <li><Link to="/contact" className="footer__link">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="footer__title-lg">Contact Us</h4>
              <ul className="footer__list footer__text-muted">
                <li className="footer__row">
                  <FaPhone /> +91 9271234579
                </li>
                <li className="footer__row">
                  <FaWhatsapp /> +91 9145657674
                </li>
                <li className="footer__row">
                  📍 Kolhapur,Maharashtra
                </li>
              </ul>
            </div>
            <div>
              <h4 className="footer__title-lg">Business Hours</h4>
              <ul className="footer__list footer__text-muted">
                <li className="footer__row">
                  <FiClock /> Monday - Saturday: 7AM - 10PM
                </li>
                <li>Sunday: Emergency Only</li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p>© {new Date().getFullYear()} M.S Infocare. All rights reserved.</p>
          </div>
        </div>
      </div>
    )
}