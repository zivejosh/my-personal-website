import { motion } from 'framer-motion';
import heroImage from '../../assets/Home_Page_Assets/Josh_Zive_BuildingPC.PNG';
import './HeroSection.css';

function HeroSection() {
  return (
    <motion.section 
      className="hero-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="hero-copy">
        <h1>
          <span style={{ fontWeight: 400 }}>Hi I'm </span>
          Joshua Zive
          <span style={{ fontWeight: 400 }}>, Welcome to my Digital Board</span>
        </h1>
        <p>A personal bulletin board for technical insights, project updates, industry comments, and latest reflections.</p>
        <motion.a
          href="https://github.com/zivejosh"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EXPLORE MY PROJECTS
        </motion.a>
      </div>
      <div className="hero-visual">
        <img src={heroImage} alt="Josh Zive Building a PC" className="hero-image" />
      </div>
    </motion.section>
  );
}

export default HeroSection;