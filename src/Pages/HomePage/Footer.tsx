import { motion } from 'framer-motion';
import profileImage from '../../assets/Home_Page_Assets/Josh_Zive_NoBackground.png';
import resumePDF from '../../assets/Home_Page_Assets/Joshua_Zive_Resume-v4.pdf';
import './Footer.css';

function Footer() {
  return (
    <motion.footer 
      className="site-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-column footer-branding">
        <div className="footer-logo">
          <img src={profileImage} alt="Joshua Zive" className="avatar" />
          <span>Joshua Zive</span>
        </div>
        <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', marginTop: '12px' }}>
          <a href={resumePDF} target="_blank" rel="noopener noreferrer">Resume</a>
          <a href="https://github.com/JoshuaZive" target="_blank" rel="noopener noreferrer">Portfolio</a>
          <a href="/articles">Blog</a>
        </div>
      </div>

      <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h4 className="footer-title">Stay Connected</h4>
        <div className="social-icons" style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="https://www.linkedin.com/in/joshua-zive-675a541b5/" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>

    </motion.footer>
  );
}

export default Footer;